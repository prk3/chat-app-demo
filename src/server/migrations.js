
require('dotenv').config()
const mysql = require('mysql')

const migrations = [
  require('./migrations/MessagesMigration.js'),
  require('./migrations/UserStatsMigration.js'),
]



switch (process.argv[2]) {
  case 'up':
  case undefined:
    var up = true
    break

  case 'down':
    var up = false
    break

  default:
    throw Error('Allowed parameters: up, down')
}


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})



// Promisse wrapper for a migration function with error callback parameter

const runMigration = migrationFunction =>
  new Promise((resolve, reject) => {
    migrationFunction((error, result, fields) => {
      if (error)
        reject(error)
      else
        resolve()
    })
  })


// takes an array of migrations and runs them sequentially
// by calling itself from within promise's resolve

const runAllMigrations = migrations => {
  if (migrations.length > 0) {
    // there are still migrations to run

    let migration = migrations[0]

    runMigration(callback => up
        ? (new migration(connection)).up(callback)
        : (new migration(connection)).down(callback)
      )

      .then(() =>
        // previous migration succeeded
        runAllMigrations(migrations.slice(1))
      )

      .catch(error => {
        // some migration failed
        connection.rollback()
        connection.end(error => connection.destroy())
        throw error
      })

  } else {
    // all migrations succeeded
    connection.commit()
    connection.end(error => connection.destroy())
  }
}

connection.beginTransaction(error => { if (error) throw error })
runAllMigrations(up ? migrations : migrations.reverse())

