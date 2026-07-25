const sql = require("mysql2");

const dotenv = require("dotenv").config();

// const host = "localhost" || process.env.HOST;

// const user = "root" || process.env.USER;

// const password = "" || process.env.PASSWORD;

// const database = "hirix" || process.env.DATABASE;

const host = process.env.HOST;

const user = process.env.USER;

const password = process.env.PASSWORD;

const database = process.env.DATABASE;

const conn_sql = sql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

conn_sql.on('error', (err) => {
  console.error('Database pool error:', err);
});

function databaseconfig() {
  conn_sql.getConnection((err, connection) => {
    if (err) {
      console.log("Database is not connected", err);
    } else {
      console.log("Database connected via Connection Pool");
      connection.release();
    }
  });
}

module.exports = {
  databaseconfig,
  conn_sql,
};
