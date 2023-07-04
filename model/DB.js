const sql = require('mssql')
require('dotenv').config()

var closeConnectionTimeout = null

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
}

class DB {
  constructor(query) {
    this.query = query
  }

  async ExecuteQuery(query) {
    try {
      if (closeConnectionTimeout) {
        clearTimeout(closeConnectionTimeout)
      }
      await sql.connect(sqlConfig)

      const result = await sql.query(`${query}`)
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async ExecuteScalar(query) {
    try {
      if (closeConnectionTimeout) {
        clearTimeout(closeConnectionTimeout)
      }
      await sql.connect(sqlConfig)

      const result = await sql.query(`${query}`)
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async closeConnection() {
    closeConnectionTimeout = setTimeout(async function () {
      await sql.close()
      console.log('closeConnection with DB')
    }, 3000)
  }
}

module.exports = DB
