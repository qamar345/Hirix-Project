const { conn_sql } = require("../../config/connection");

const Graph = (req, res) => {
  const days = parseInt(req.params.days) || 7; // Default: 7 days

  const sql = `
      SELECT DATE(created_at) AS name, COUNT(id) AS visits 
FROM companies 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) 
GROUP BY DATE(created_at) 
ORDER BY name

    `;

  conn_sql.query(sql, [days], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: err.message });
    }
    console.log(result)
    res.json(result);
  });
};

const CandidateGraph = (req, res) => {
  const days = parseInt(req.params.days) || 7; // Default: 7 days

  const sql = `
      SELECT DATE(created_at) AS name, COUNT(id) AS visits 
FROM user_accounts 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) 
GROUP BY DATE(created_at) 
ORDER BY name

    `;

  conn_sql.query(sql, [days], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: err.message });
    }
    console.log(result)
    res.json(result);
  });
};

module.exports = { Graph , CandidateGraph };
