

class MessagesMigration {

  constructor(connection) {
    this.connection = connection
  }

  up(callback) {
    this.connection.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id       INT           PRIMARY KEY  AUTO_INCREMENT,
        author   VARCHAR(50)   NOT NULL,
        content  VARCHAR(400)  NOT NULL,
        time     DATETIME      NOT NULL
      );
    `, callback)
  }

  down(callback) {
    this.connection.query(`
      DROP TABLE IF EXISTS messages;
    `, callback)
  }
}

module.exports = MessagesMigration

