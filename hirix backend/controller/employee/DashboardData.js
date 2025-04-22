const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcrypt");

// get dashboard data
const Dashboard = (req, res) => {
  const { id } = req.params;

  const sql_get = `
    SELECT 'posted jobs' AS label, COUNT(*) AS num FROM jobs WHERE employee_id = ? 
    UNION 
    SELECT 'applicants' AS label, COUNT(*) AS num FROM applicants WHERE job_id IN (SELECT id FROM jobs WHERE employee_id = ?) 
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
    j.title AS job_name,
    (SELECT COUNT(*) FROM applicants WHERE job_id = j.id) AS total_applicants,
    u.username AS applicant_name,  
    a.created_at AS applied_date
FROM jobs j
JOIN applicants a ON j.id = a.job_id
JOIN user_accounts u ON a.employee_id = u.id  
WHERE j.employee_id = ?
ORDER BY j.id, a.created_at DESC`;

  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      console.log("Database Error:", err);
      return res.json({
        success: false,
        message: "Database error",
        error: err,
      });
    } else {
      console.log("Query Result:", result);
      return res.json({ success: true, data: result });
    }
  });
};

module.exports = { Dashboard, dashData };
