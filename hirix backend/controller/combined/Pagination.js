const { conn_sql } = require("../../config/connection");

// pagination
//  const pagination = (req, res) => {
//     const page = parseInt(req.query.page) || 1; // Default page 1
//     const pageSize = parseInt(req.query.pageSize) || 10; // Default pageSize 10
  
//     if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
//       return res.status(400).json({ error: "Invalid page or pageSize value" });
//     }
  
//     const offset = (page - 1) * pageSize;
//     const sql_query = `SELECT * FROM companies LIMIT ?, ?`;
  
//     conn_sql.query(sql_query, [offset, pageSize], (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: "Database error", details: err });
//       }
  
//       conn_sql.query(`SELECT COUNT(*) AS total FROM companies`, (err, countResult) => {
//         if (err) {
//           return res.status(500).json({ error: "Count error", details: err });
//         }
  
//         const totalItems = countResult[0].total;
//         const totalPages = Math.ceil(totalItems / pageSize);
  
//         return res.json({ companies: result, totalPages, totalItems });
//       });
//     });
//   };
  


// module.exports = { pagination };
