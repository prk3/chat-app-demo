
const Notifcation = require('../util/Notification.js')
const _escape = require('lodash/escape')

const ValidationException = require('../util/ValidationException.js')


class MessageController {

  static index(db) {
    return new Promise((resolve, reject) => {

      db.query(`SELECT * FROM messages`, (error, result, fields) => {
        if (error)
          reject(error)
        else
          resolve(result, fields)
      })
    })
  }

  static create(db, data, username) {
    return new Promise((resolve, reject) => {

      if (! this.validateMessageData(data)) {
        reject(new ValidationException('Request did not pass the validation.'))
        return
      }

      const notification = Object.assign({}, {
        content: this.processMessageContent(data.content),
        author: username,
        time: new Date()
      })

      db.query(`
        INSERT INTO messages(author, content, time)
        VALUES (?, ?, ?)`,
        [
          notification.author,
          notification.content,
          notification.time,
        ],
        function(error, result, fields) {
          if (error)
            reject(error)
          else
            this.removeOldMessages(db)
              .then(() => resolve(Object.assign(notification, { id: result.insertId })))
              .catch(error => reject(error))
        }.bind(this))
    })
  }

  static removeOldMessages(db) {
    return new Promise((resolve, reject) => {

      const leaveLatest = 50

      db.query(`
        DELETE FROM messages
          WHERE id <= (
            SELECT id
            FROM (
              SELECT id
              FROM messages
              ORDER BY time DESC
              LIMIT 1 OFFSET ${leaveLatest}
            ) foo
          );
        `,
        (error, result, fields) => {
          if (error)
            reject(error)
          else
            resolve()
        })
    })
  }

  static validateMessageData(data) {
    if (typeof data.content != 'string')
      return false

    const content = data.content.trim()

    return (content.length > 0 && content.length < 500)
  }

  // finds links in message content and replaces them with <a></a> tag
  // other content gets escaped (xss protection)

  static processMessageContent(message) {
    message = message.trim()

    const urlRegex = /https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[a-z0-9-_#~@%&?+=,.]*[a-z0-9-_#~@%&?+=]+)*\/?/ig

    let lastMatchEnd = 0
    let result = ''

    message.replace(urlRegex, (url, offset) => {

      // escape text in between urls
      result += _escape(message.slice(lastMatchEnd, offset))

      // create link
      result += `<a href="${url}">${url.replace('&', '&amp;')}</a>`

      lastMatchEnd = offset + url.length
    })


    // add part from last match to the end
    if (lastMatchEnd < message.length)
      result += _escape(message.slice(lastMatchEnd))

    return result
  }
}

module.exports = MessageController

