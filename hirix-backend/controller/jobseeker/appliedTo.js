const { conn_sql } = require("../../config/connection");

// Confirms the applicant row at :id belongs to the authenticated jobseeker.
function withApplicationOwnership(req, res, onOwned) {
  const { id } = req.params;
  conn_sql.query("SELECT id, job_seeker_id FROM applicants WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }
    const application = rows[0];
    if (!req.user || String(application.job_seeker_id) !== String(req.user.id)) {
      return res.status(403).json({ msg: "You do not have access to this application" });
    }
    onOwned(application);
  });
}

// Tracking (this is for job seeker who wants to see his/her jobs where he/she applied to)
const appliedTo = (req, res) => {
  const { id } = req.params;
  const { type, search } = req.query || {};
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;

  let statusCondition = "";
  let countCondition = "";

  // Apply condition based on type
  if (type === "applied") {
    statusCondition = "AND applicants.status != 'Wishlist'";
    countCondition = "AND status != 'Wishlist'";
  } else if (type === "wishlist") {
    statusCondition = "AND applicants.status = 'Wishlist'";
    countCondition = "AND status = 'Wishlist'";
  }

  let searchCondition = "";
  const queryParams = [id];

  if (search && search.trim() !== "") {
    searchCondition = "AND (jobs.title LIKE ? OR jobs.city LIKE ?)";
    queryParams.push(`%${search}%`, `%${search}%`);
  }

  const sql_applied = `
  SELECT jobs.*, applicants.id, applicants.status, applicants.created_at
  FROM jobs
  JOIN applicants ON jobs.id = applicants.job_id
  WHERE applicants.job_seeker_id = ?
    ${statusCondition}
    ${searchCondition}
  LIMIT ? OFFSET ?
`;

  conn_sql.query(
    sql_applied,
    [...queryParams, limit, offset],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const filteredCountQuery = `
      SELECT COUNT(*) AS count
      FROM jobs
      JOIN applicants ON jobs.id = applicants.job_id
      WHERE applicants.job_seeker_id = ?
        ${statusCondition}
        ${searchCondition}
    `;

      conn_sql.query(filteredCountQuery, queryParams, (err, filteredCountResult) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const totalPages = Math.ceil((filteredCountResult[0]?.count || 0) / limit);

        const totalCountQuery = `
        SELECT COUNT(*) AS total_applications
        FROM applicants
        WHERE job_seeker_id = ?
           ${countCondition}
      `;

        conn_sql.query(totalCountQuery, [id], (err, countResult) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const totalApplications = countResult[0] ? countResult[0].total_applications : 0;

          return res.json({
            jobs: result,
            TotalApplications: totalApplications,
            meta: {
              page,
              limit,
              totalPages,
            },
          });
        });
      });
    }
  );
};

// Apply (wishlist to apply job)
const Apply = (req, res) => {
  withApplicationOwnership(req, res, (application) => {
    const sql_delete = "UPDATE `applicants` SET `status`= 'Applied' WHERE id=?";

    conn_sql.query(sql_delete, [application.id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        if (result && result.affectedRows > 0) {
          return res.json({ msg: "Applied successfully", result });
        } else {
          return res.status(404).json({ msg: "Application not found or no change made" });
        }
      }
    });
  });
};

// Delete From Table
const DeleteFromTable = (req, res) => {
  withApplicationOwnership(req, res, (application) => {
    const sql_delete = "UPDATE `applicants` SET `delete`= 1 WHERE id=?";

    conn_sql.query(sql_delete, [application.id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        if (result && result.affectedRows > 0) {
          return res.json({ msg: "Deleted successfully", result });
        } else {
          return res.status(404).json({ msg: "Record not found or no change made" });
        }
      }
    });
  });
};

// Cancel Application
const CancleApplication = (req, res) => {
  withApplicationOwnership(req, res, (application) => {
    const sql_delete = "DELETE FROM `applicants` WHERE id=?";

    conn_sql.query(sql_delete, [application.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        if (result.affectedRows > 0) {
          return res.json({ msg: "Application canceled successfully" });
        } else {
          return res.json({ msg: "No application found with this ID" });
        }
      }
    });
  });
};

// Apply for the job
const ApplyForJob = (req, res) => {
  const { id } = req.params;
  const { job_id } = req.query;

  // 1. Get user role
  const sql_role = "SELECT role FROM user_accounts WHERE id = ?";
  conn_sql.query(sql_role, [id], (err, roleResult) => {
    if (err) return res.json({ msg: "Error checking user role" });

    if (roleResult.length === 0) return res.json({ msg: "User not found" });

    const role = roleResult[0].role;

    if (role !== "jobseeker") {
      return res.json({ msg: "Only jobseekers can apply for jobs." });
    }

    // 2. Continue with job details and application logic
    const sql_get = "SELECT id AS job_id, employee_id FROM jobs WHERE id = ?";
    conn_sql.query(sql_get, [job_id], (err, result) => {
      if (err) return res.json({ msg: "Error getting job details" });

      if (result.length === 0) return res.json({ msg: "Job not found" });

      const { employee_id } = result[0];

      const sql_check = `
        SELECT * FROM applicants 
        WHERE job_seeker_id = ? AND job_id = ?
      `;
      conn_sql.query(sql_check, [id, job_id], (err, existing) => {
        if (err) return res.json({ msg: "Error checking application" });

        if (existing.length > 0) {
          const currentStatus = existing[0].status;

          if (currentStatus === "Wishlist") {
            const sql_update = `
              UPDATE applicants 
              SET status = 'Applied' 
              WHERE job_seeker_id = ? AND job_id = ?
            `;
            conn_sql.query(sql_update, [id, job_id], (err, result) => {
              if (err) return res.json({ msg: "Error updating status" });

              return res.json({ msg: "Successfully Applied", result });
            });
          } else {
            return res.json({
              msg: "You have already applied for this job.",
            });
          }
        } else {
          const sql_apply = `
            INSERT INTO applicants(job_seeker_id, employee_id, job_id) 
            VALUES (?, ?, ?)
          `;
          conn_sql.query(
            sql_apply,
            [id, employee_id, job_id],
            (err, result) => {
              if (err) return res.json({ msg: "Error applying" });

              return res.json({ msg: "Successfully applied", result });
            }
          );
        }
      });
    });
  });
};

// get wishlist
const GetWishlist = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT job_id FROM applicants 
    WHERE job_seeker_id = ? AND status = 'Wishlist'
  `;
  conn_sql.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Add to wishlist
const AddToWishlist = (req, res) => {
  const { id } = req.params;
  const { job_id } = req.query;

  const sql_get = "SELECT employee_id FROM jobs WHERE id = ?";
  conn_sql.query(sql_get, [job_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0)
      return res.status(404).json({ msg: "Job not found" });

    const { employee_id } = result[0];
    const check_sql = `
      SELECT * FROM applicants 
      WHERE job_seeker_id = ? AND job_id = ?
    `;
    conn_sql.query(check_sql, [id, job_id], (err, existing) => {
      if (err) return res.status(500).json(err);

      if (existing.length > 0) {
        const currentStatus = existing[0].status;
        if (currentStatus === "Applied") {
          return res.json({ msg: "You have already applied for this job." });
        }

        if (currentStatus === "Wishlist") {
          return res.json({ msg: "Job already in wishlist" });
        }
      }

      const sql_add = `
        INSERT INTO applicants (job_seeker_id, employee_id, job_id, status)
        VALUES (?, ?, ?, 'Wishlist')
      `;
      conn_sql.query(sql_add, [id, employee_id, job_id], (err) => {
        if (err) return res.status(500).json(err);

        // ✅ Get updated wishlist after inserting
        const getUpdated = `
          SELECT job_id FROM applicants 
          WHERE job_seeker_id = ? AND status = 'Wishlist'
        `;
        conn_sql.query(getUpdated, [id], (err, updated) => {
          if (err) return res.status(500).json(err);
          const jobIds = updated.map((row) => row.job_id);
          return res.json({ msg: "Job added to wishlist", wishlist: jobIds });
        });
      });
    });
  });
};

// Add skillset to fill form
const Addskillset = async (req, res) => {
  const { id } = req.params;
  const { skills } = req.body;

  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ message: "Skills are required." });
  }

  const insertSkillQuery =
    "INSERT INTO `jobseeker_skills`(`job_seeker_id`, `skillset_id`) VALUES (?, ?)";

  // conn_sql.query is async - firing all inserts in a loop and checking an
  // outer variable right after the loop always read it before any query had
  // actually resolved, so this endpoint reported "success" even when every
  // insert failed. Wait for every insert to actually settle first.
  const results = await Promise.allSettled(
    skills.map(
      (s_id) =>
        new Promise((resolve, reject) => {
          conn_sql.query(insertSkillQuery, [id, s_id], (err, insertResult) => {
            if (err) reject(err);
            else resolve(insertResult);
          });
        })
    )
  );

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length > 0) {
    console.error("Addskillset: failed to insert some skills:", failed.map((f) => f.reason && f.reason.message));
    if (failed.length === results.length) {
      return res.status(500).json({ message: "Failed to add skills." });
    }
    return res.status(207).json({ message: `${results.length - failed.length} of ${results.length} skills added; some failed.` });
  }

  return res.json({ message: "Skills added successfuly" });
};
// if (!skills){
//   return res.json({message: 'skills are compulsory to be mentioned.'});
// }
// const skillNames = skills.split(",").map((skill) => skill.trim());
// const fetchskills = "SELECT id FROM skillset WHERE skills IN (?)";
// conn_sql.query(fetchskills, [skillNames, id], (err, skillResult) => {
//   if (err) throw err;
//   else {
// //   if(!skillResult.length){
// //     res.json({message: 'NO matching found in the database.'});
// //   }
//   const skillIds = skillResult.map((row) => row.id);
//   // const skillvalues = skillNames.map((skillNames) => {
//   //      return [jobseeker_id,skillNames];
//   // });
// const skillvalues = skillIds.map((skillId) => [job_seeker_id, skillId]);
// console.log(skillvalues);
//   const insertskillsql = "INSERT INTO jobseeker_skills (job_seeker_id, skillIds) VALUES (?  ,?)";
//   conn_sql.query(insertskillsql,[skillvalues], (err) => {
//     if (err) throw err;
//     else
//     res.json({message: 'Skills added successfully!'});
//   });
// }
// });

module.exports = {
  appliedTo,
  GetWishlist,
  ApplyForJob,
  Addskillset,
  DeleteFromTable,
  CancleApplication,
  Apply,
  AddToWishlist,
};
