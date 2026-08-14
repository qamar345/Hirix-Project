const { conn_sql } = require("../../config/connection");

// get all employees data
const Getdata = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = 10;
  const offset = (page - 1) * limit;
  const sql_get = "SELECT * FROM `user_accounts` WHERE role = 'employee' AND username LIKE ? LIMIT ? OFFSET ?";
  conn_sql.query(sql_get, [`%${search}%`, limit, offset], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else  {
      const sql = "SELECT COUNT(*) as count FROM `user_accounts` WHERE role = 'employee' AND username LIKE ?";

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

// get all users data
const Getusers = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = 10;
  const offset = (page - 1) * limit;

  const sql_get = "SELECT * FROM `user_accounts` WHERE role ='jobseeker' AND username LIKE ?  LIMIT ? OFFSET ?";
  conn_sql.query(sql_get, [`%${search}%`, limit, offset], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else  {
      const sql = "SELECT COUNT(*) as count FROM `user_accounts` WHERE role = 'jobseeker' AND username LIKE ?";

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

// get dashboard data
const GetDashboard = (req, res) => {
  const sql_get = "SELECT 'Total jobs' AS label, COUNT(*) AS num FROM `jobs` UNION SELECT 'candidates' AS label, COUNT(*) AS num FROM `user_accounts` WHERE role = 'jobseeker' UNION SELECT 'Employees' AS label, COUNT(*) AS num FROM `user_accounts` WHERE role = 'employee' UNION SELECT 'Total companies' AS label, COUNT(*) AS num FROM `companies` WHERE `status_delete` = 1";
  conn_sql.query(sql_get, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      return res.json(result);
    }
  });
};

// get all managers data
const GetManagers = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const sql_get = "SELECT * FROM `admin-account` WHERE role !='admin' LIMIT ? OFFSET ?";
  conn_sql.query(sql_get,[limit, offset], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else  {
      const sql = "SELECT COUNT(*) as count FROM `admin-account` WHERE role != 'admin'";

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

  module.exports = {Getdata, Getusers, request, GetManagers,
    requestrejected, GetDashboard};