const { query } = require("express");
const { conn_sql } = require("../../config/connection");
const { VerifyEmail } = require("../../mailer/mailer-controller");
const bcrypt = require("bcryptjs");

// get All companies
const Getcompanies = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;

  const sql_get = `
    SELECT
      c.*,
      COUNT(CASE WHEN j.status = 'Open' THEN j.id END) AS active_jobs
    FROM companies c
    LEFT JOIN jobs j
      ON j.company_name = c.id
    WHERE c.name LIKE ?
    GROUP BY c.id
    LIMIT ? OFFSET ?
  `;

  conn_sql.query(sql_get, [`%${search}%`, limit, offset], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      const sql = "SELECT COUNT(*) as count FROM companies WHERE name LIKE ?";
      conn_sql.query(sql, [`%${search}%`], (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: result,
          meta: {
            search,
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }
  });
};



// Approved company
const Approvedcompany = (req, res) => {
  const { id } = req.params;
  const sql_active =
    "UPDATE `companies` SET `status` = 'Approved' WHERE `id` = ?";
  conn_sql.query(sql_active, [id], (err, result) => {
    if (err) {
      return res.json({ msg: "Not updated yet!!", err });
    } else {
      return res.json({ msg: "Approved!", result });
    }
  });
};

// Reject company
const Rejectcompany = (req, res) => {
  const { id } = req.params;
  const sql_active =
    "UPDATE `companies` SET `status` = 'Rejected' WHERE `id` = ?";
  conn_sql.query(sql_active, [id], (err, result) => {
    if (err) {
      return res.json({ msg: "Not updated yet!!", err });
    } else {
      return res.json({ msg: "Rejected!", result });
    }
  });
};

module.exports = { Getcompanies, Approvedcompany, Rejectcompany };
