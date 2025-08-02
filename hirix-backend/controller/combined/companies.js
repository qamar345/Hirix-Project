const { query } = require("express");
const { conn_sql } = require("../../config/connection");
const { VerifyEmail } = require("../../mailer/mailer-controller");
const bcrypt = require("bcryptjs");

// get All companies
const Getcompanies = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const sql_get = `
    SELECT 
      c.*, 
      COUNT(CASE WHEN j.status = 'Open' THEN j.id END) AS active_jobs
    FROM companies c
    LEFT JOIN jobs j 
      ON j.company_name = c.id
    GROUP BY c.id
    LIMIT ? OFFSET ?
  `;

  conn_sql.query(sql_get, [limit, offset], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      const sql = "SELECT COUNT(*) as count FROM companies";
      conn_sql.query(sql, (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: result,
          meta: {
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
