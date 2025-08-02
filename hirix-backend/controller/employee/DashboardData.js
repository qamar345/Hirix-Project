const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcryptjs");

// get dashboard data
const Dashboard = (req, res) => {
  const { id } = req.params;

  const sql_get = `
    SELECT 'posted jobs' AS label, COUNT(*) AS num FROM jobs WHERE employee_id = ? 
    UNION 
    SELECT 'applicants' AS label, COUNT(*) AS num FROM applicants WHERE employee_id = ? AND status = 'Applied' 
    UNION 
    SELECT 'meetings' AS label, COUNT(*) AS num FROM applicants WHERE employee_id = ? AND status = 'Meeting' 
    UNION 
    SELECT 'companies' AS label, COUNT(*) AS num FROM companies WHERE user_account_id = ? AND status_delete = 1
  `;

  conn_sql.query(sql_get, [id, id, id, id], (err, result) => {
    if (err) {
      console.log("Database Error:", err);
      return res.json({
        success: false,
        message: "Database error",
        error: err,
      });
    } else {
      console.log("Query Result:", result); // Debugging
      return res.json({ success: true, data: result });
    }
  });
};

// Dasboard job related column data
const dashData = (req, res) => {
  const { id } = req.params;

  const sql_get = `
    SELECT 
        j.id AS job_id,
        j.title AS job_title,
        u.first_name,
        u.last_name,
        u.email,
        a.created_at AS applied_date,
        a.status AS status,
        (SELECT COUNT(*) 
         FROM applicants a2 
         WHERE a2.job_id = j.id) AS total_applicants
    FROM applicants a
    JOIN jobs j ON a.job_id = j.id
    JOIN user_accounts u ON a.job_seeker_id = u.id
    WHERE j.employee_id = ?
    ORDER BY j.id, a.created_at DESC;
  `;

  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      console.log("Database Error:", err);
      return res.json({
        success: false,
        message: "Database error",
        error: err,
      });
    } else {
      return res.json({ success: true, data: result });
    }
  });
};

module.exports = { Dashboard, dashData };
