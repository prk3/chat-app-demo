

class UserStatsController {

  static create(db, socket, username) {
    return new Promise((resolve, reject) => {

      db.query(`
        INSERT INTO user_stats(name, connected_at, ip, agent, language)
        VALUES (?, ?, ?, ?, ?)`,
        [
          username,
          new Date(socket.handshake.issued),
          socket.handshake.address,
          socket.handshake.headers['user-agent'],
          socket.handshake.headers['accept-language'],
        ],
        (error, response, fields) => {
          if (error)
            reject(error)
          else
            resolve()
        }
      )
    })
  }
}

module.exports = UserStatsController

