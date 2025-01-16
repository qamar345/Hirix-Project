const { conn_sql } = require("../../config/connection");

// get all user's data
const Getdata = (req, res) => {
  const sql_get = "SELECT * FROM `user_accounts`";
  conn_sql.query(sql_get, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

// Approved Request of employee for registeration
const request = (req, res) => {
//     const { id } = req.params;
  
//     const sql_request = "UPDATE `employee-account` SET `profile_status` = 1 WHERE id = ?";
//     conn_sql.query(sql_request, [id], (err, result) => {
//       if (err) {
//         return res.json({ msg: "Not updated yet!!", err });
//       } else {
//         return res.json({msg: "Updated...",result});
//       }
//     });
  };
  
//   // Rejected  (Request of Employee for registeration)
  const requestrejected = (req, res) => {
//     const { id } = req.params;
  
//     const sql_request = "UPDATE `employee-account` SET `profile_status` = 0 WHERE id = ?";
//     conn_sql.query(sql_request, [id], (err, result) => {
//       if (err) {
//         return res.json({ msg: "Not updated yet!!", err });
//       } else {
//         return res.json({msg: "Rejected...",result});
//       }
//     });
  };

  module.exports = {Getdata, request,
    requestrejected};