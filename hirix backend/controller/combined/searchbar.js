const { conn_sql } = require("../../config/connection");

const search = (req, res) => {
    const sql_get = "SELECT * FROM `jobs` WHERE title LIKE ?";
    const values = [`%${searchQuery}`];
    conn_sql.query(sql_get, values, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        // console.log(result);
        return res.json(result);
      }
    });
  };

  module.exports = {search};