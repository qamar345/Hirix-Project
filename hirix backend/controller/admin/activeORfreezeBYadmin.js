const { conn_sql } = require("../../config/connection");

// Active Employee
const Active = (req, res) => {
  const { id } = req.params;
  const sql_active = "UPDATE `user_accounts` SET `account_status` = 1 WHERE `id` = ?";
  conn_sql.query(sql_active, [id], (err, result) => {
    if (err) {
      return res.json({ msg: "Not updated yet!!", err });
    } else {
      return res.json({ msg: "Active!", result });
    }
  });
};

// Freeze Employee
const Freeze= (req, res) => {
  const { id } = req.params;
  const {reason} = req.body;
  const sql_freeze = "UPDATE `user_accounts` SET `account_status` = 0 WHERE `id` = ?";
  conn_sql.query(sql_freeze, [id], (err, result) => {
    if (err) {
      return res.json({ msg: "Not updated!!", err });
    } else {
        const sql_insert_reason = "INSERT INTO freeze_users (user_id, reason) VALUES (?, ?)";
        conn_sql.query(sql_insert_reason, [id, reason], (err, result) => {
          if (err) {
            return res.json({ msg: "Reason not added!!", err });
          } else {
            return res.json({ msg: "Account frozen", result });
          }
        });
    }
  });
};


module.exports = {Active, Freeze};