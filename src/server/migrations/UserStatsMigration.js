

class UserStatsMigration {

  constructor(connection) {
    this.connection = connection
  }

  up(callback) {
    this.connection.query(`
      CREATE TABLE IF NOT EXISTS user_stats (
        id            INT           PRIMARY KEY  AUTO_INCREMENT,
        name          VARCHAR(50)   NOT NULL,
        connected_at  DATETIME      NOT NULL,
        ip            CHAR(30)      NOT NULL,
        agent         VARCHAR(200),
        language      VARCHAR(200)
      );
    `, callback)
  }

  down(callback) {
    this.connection.query(`
      DROP TABLE IF EXISTS user_stats;
    `, callback)
  }
}


module.exports = UserStatsMigration

