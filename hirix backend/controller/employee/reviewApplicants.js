const { conn_sql } = require("../../config/connection");

// Review all his/her applicants
const Getapplicants = (req, res) => {
  const { id } = req.params;
  // const sql_employee = "SELECT * FROM `applicants` WHERE employee_id = ?";
  // conn_sql.query(sql_employee, [id], (err, result) => {
  //   if (err) {
  //     return res.json(err);
  //   } else {
  //     if (result.length > 0) {
  const sql_get =
    "SELECT user_accounts.username AS jobseeker_name, user_accounts.email AS jobseeker_email, user_accounts.phone AS jobseeker_phone, jobs.title AS jobs_title, jobs.description AS jobs_description FROM `applicants` JOIN user_accounts ON applicants.job_seeker_id = user_accounts.id JOIN jobs ON applicants.job_id = jobs.id WHERE applicants.employee_id =? ";
  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
  //     }
  //   }
  // });
};

module.exports = { Getapplicants };
