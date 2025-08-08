const { conn_sql } = require("../../config/connection");

// Review all his/her applicants
// const Getapplicants = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const search = req.query.search || "";
//   const limit = 10;
//   const offset = (page - 1) * limit;
//   const { id } = req.params;
//   const sql_employee = "SELECT * FROM `applicants` WHERE employee_id = ? LIKE ?  LIMIT ? OFFSET ?";
//   conn_sql.query(sql_employee, [id, `%${search}%`, limit, offset], (err, result) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       if (result.length > 0) {
//   const sql_get =
//     "SELECT user_accounts.username AS jobseeker_name, user_accounts.email AS jobseeker_email, user_accounts.phone AS jobseeker_phone, jobs.title AS jobs_title, jobs.description AS jobs_description FROM `applicants` JOIN user_accounts ON applicants.job_seeker_id = user_accounts.id JOIN jobs ON applicants.job_id = jobs.id WHERE applicants.employee_id =? ";
//   conn_sql.query(sql_get, [`%${search}%`], (c_err, c_data) => {
//     const totalData = c_data[0].count;
//     const totalPages = Math.ceil(totalData / limit);
//     return res.json({
//       data: result,
//       meta: {
//         search,
//         page,
//         limit,
//         totalData,
//         totalPages,
//       },
//     });
//   });
//       }
//     }
//   });
// };

const Getapplicants = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = 10;
  const offset = (page - 1) * limit;
  const { id } = req.params;

  // Step 1: Count total applicants for pagination
  const countQuery = `
    SELECT COUNT(*) AS totalData 
    FROM applicants 
    JOIN user_accounts ON applicants.job_seeker_id = user_accounts.id 
    JOIN jobs ON applicants.job_id = jobs.id 
    WHERE applicants.employee_id = ? 
    AND (user_accounts.username LIKE ? OR jobs.title LIKE ?)
  `;

  conn_sql.query(
    countQuery,
    [id, `%${search}%`, `%${search}%`],
    (countErr, countResult) => {
      if (countErr) {
        return res.json({ error: countErr });
      }

      const totalData = countResult[0].totalData;
      const totalPages = Math.ceil(totalData / limit);

      // Step 2: Fetch required data
      const sql_get = `
      SELECT 
      applicants.job_seeker_id ,
        applicants.id AS Applicantion_id,
        user_accounts.username AS jobseeker_name,  
        jobs.title AS jobs_title,
        applicants.status AS application_status,
        applicants.created_at AS created_at
      FROM applicants 
      JOIN user_accounts ON applicants.job_seeker_id = user_accounts.id 
      JOIN jobs ON applicants.job_id = jobs.id 
      WHERE applicants.employee_id = ? 
      AND (user_accounts.username LIKE ? OR jobs.title LIKE ?) 
      LIMIT ? OFFSET ?
    `;

      conn_sql.query(
        sql_get,
        [id, `%${search}%`, `%${search}%`, limit, offset],
        (err, data) => {
          if (err) {
            return res.json({ error: err });
          }

          return res.json({
            data: data,
            meta: {
              search,
              page,
              limit,
              totalData,
              totalPages,
            },
          });
        }
      );
    }
  );
};

module.exports = { Getapplicants };
