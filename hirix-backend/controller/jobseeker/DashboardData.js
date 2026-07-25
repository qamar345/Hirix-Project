const { conn_sql } = require("../../config/connection");

const cron = require("node-cron");

// get dashboard data
const JS_Dashboard = (req, res) => {
  const { id } = req.params;

  const sql_get = `SELECT 'Applied jobs' AS label, COUNT(*) AS num
FROM applicants
WHERE job_seeker_id = ? AND applicants.status != 'Wishlist'

UNION

SELECT 'Expired jobs' AS label, COUNT(*) AS num
FROM applicants
JOIN jobs ON applicants.job_id = jobs.id
WHERE applicants.job_seeker_id = ? AND jobs.expiry_date < NOW()

UNION

SELECT 'reviews' AS label, COUNT(*) AS num
FROM applicants
JOIN jobs ON applicants.job_id = jobs.id
WHERE applicants.job_seeker_id = ? AND applicants.status != 'Wishlist'

UNION

SELECT 'Selected/Hired' AS label, COUNT(*) AS num
FROM applicants
WHERE job_seeker_id = ? AND applicants.status = 'Selected';
`;

  conn_sql.query(sql_get, [id, id, id, id], (err, result) => {
    if (err) {
      console.log("Database Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    } else {
      return res.json({ success: true, data: result });
    }
  });
};

// Select Skills in search bar
const Skills_select = (req, res) => {
  const query_select = `SELECT id, skills AS name FROM skillset`;
  conn_sql.query(query_select, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    } else {
      return res.json(result);
    }
  });
};

cron.schedule("* * * * *", () => {
  const today = new Date().toISOString().split("T")[0];
  const updateQuery = `
    UPDATE jobs 
    SET status = 'Closed' 
    WHERE status = 'Open' AND expiry_date < ?
  `;

  conn_sql.query(updateQuery, [today], (err, result) => {
    if (err) {
      console.error("Cron failed to update expired jobs:", err);
    } else {
      console.log(today);
      console.log("Cron updated expired jobs:", result.affectedRows);
    }
  });
});

const GraphUser = (req, res) => {
  const { id } = req.params;

  const days = parseInt(req.params.days) || 7;
  console.log("days are", days);
  const sql = `
      SELECT DATE(created_at) AS name, COUNT(id) AS visits 
      FROM applicants 
      WHERE job_seeker_id = ? 
      AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) 
      GROUP BY DATE(created_at) 
      ORDER BY name
  `;

  conn_sql.query(sql, [id, days], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    console.log(result);
    res.json(result);
  });
};
module.exports = { JS_Dashboard, Skills_select, GraphUser };
