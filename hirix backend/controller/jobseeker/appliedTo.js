const { conn_sql } = require("../../config/connection");

// Tracking (this is for job seeker who wants to see his/her jobs where he/she applied to)
const appliedTo = (req, res) => {
  const { id } = req.params;
  const {type, search} = req.query || "";

  let statusCondition = '';
  let countCondition = '';

  // Apply condition based on type
  if (type === 'applied') {
    statusCondition = "AND applicants.status != 'Wishlist'";
    countCondition = "AND status != 'Wishlist'";
  } else if (type === 'wishlist') {
    statusCondition = "AND applicants.status = 'Wishlist'";
    countCondition = "AND status = 'Wishlist'";
  }

  const sql_applied = `
    SELECT jobs.*, applicants.id, applicants.status, applicants.created_at
    FROM jobs
    JOIN applicants ON jobs.id = applicants.job_id
    WHERE applicants.job_seeker_id = ? 
      AND applicants.delete = 0 
       ${statusCondition}
      AND (
        jobs.title LIKE ? OR 
        jobs.job_type LIKE ? OR 
        jobs.workplace_type LIKE ? OR 
        jobs.job_category LIKE ?
      )
  `;

  conn_sql.query(sql_applied, [id, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
    if (err) {
      return res.json({ error: err });
    }

    const totalCountQuery = `
      SELECT COUNT(*) AS total_applications
      FROM applicants 
      WHERE job_seeker_id = ? 
        AND \`delete\` = 0 
         ${countCondition}
    `;

    conn_sql.query(totalCountQuery, [id], (err, countResult) => {
      if (err) {
        return res.json({ error: err });
      }

      const totalApplications = countResult[0].total_applications;

      return res.json({
        jobs: result,
        TotalApplications: totalApplications
      });
    });
  });
};


// Apply (wishlist to apply job)
const Apply = (req, res) => {
  const { id } = req.params;

  const sql_delete = "UPDATE `applicants` SET `status`= 'Applied' WHERE id=?";

  conn_sql.query(sql_delete, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      if (result.length > 0) {
        return res.json(result);
      } else {
        return res.json({ msg: "Applied" });
      }
    }
  });
};

// Delete From Table
const DeleteFromTable = (req, res) => {
  const { id } = req.params;

  const sql_delete = "UPDATE `applicants` SET `delete`= 1 WHERE id=?";

  conn_sql.query(sql_delete, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      if (result.length > 0) {
        return res.json(result);
      } else {
        return res.json({ msg: "Deleted" });
      }
    }
  });
};

// Cancel Application
const CancleApplication = (req, res) => {
  const { id } = req.params;

  const sql_delete = "DELETE FROM `applicants` WHERE id=?";

  conn_sql.query(sql_delete, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      if (result.affectedRows > 0) {
        return res.json({ msg: "Application canceled successfully" });
      } else {
        return res.json({ msg: "No application found with this ID" });
      }
    }
  });
};

// Apply for the job
const ApplyForJob = (req, res) => {
  const { id } = req.params; 
  const { job_id } = req.query;

  const sql_get = "SELECT id AS job_id, employee_id FROM jobs WHERE id = ?";
  conn_sql.query(sql_get, [job_id], (err, result) => {
    if (err) return res.status(500).json({ msg: "Error getting job details" });

    if (result.length === 0) return res.status(404).json({ msg: "Job not found" });

    const { employee_id } = result[0];
    const sql_check = `
      SELECT * FROM applicants 
      WHERE job_seeker_id = ? AND job_id = ?
    `;

    conn_sql.query(sql_check, [id, job_id], (err, existing) => {
      if (err) return res.status(500).json({ msg: "Error checking application" });

      if (existing.length > 0) {
        const currentStatus = existing[0].status;
        
        if (currentStatus === "Wishlist") {
          const sql_update = `
            UPDATE applicants 
            SET status = 'Applied' 
            WHERE job_seeker_id = ? AND job_id = ?
          `;
          conn_sql.query(sql_update, [id, job_id], (err, result) => {
            if (err) return res.status(500).json({ msg: "Error updating status" });

            return res.json({ msg: "Successfully Applied", result });
          });
        } else {
          return res.json({ msg: "You have already applied for this job." });
        }

      } else {
        const sql_apply = `
          INSERT INTO applicants(job_seeker_id, employee_id, job_id) 
          VALUES (?, ?, ?)
        `;
        conn_sql.query(sql_apply, [id, employee_id, job_id], (err, result) => {
          if (err) return res.status(500).json({ msg: "Error applying" });

          return res.json({ msg: "Successfully applied", result });
        });
      }
    });
  });
};

// Add to wishlist
const AddToWishlist = (req, res) => {
  const { id } = req.params; 
  const { job_id } = req.query;

  const sql_get = "SELECT employee_id FROM jobs WHERE id = ?";
  conn_sql.query(sql_get, [job_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ msg: "Job not found" });

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
          return res.json({ msg: "Already added to wishlist." });
        }
      }

      const sql_add = `
        INSERT INTO applicants (job_seeker_id, employee_id, job_id, status)
        VALUES (?, ?, ?, 'Wishlist')
      `;
      conn_sql.query(sql_add, [id, employee_id, job_id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ msg: "Successfully added to wishlist", result });
      });
    });
  });
};




// Add skillset to fill form
const Addskillset = (req, res) => {
  const { id } = req.params;
  const { skills } = req.body;

  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ msg: "Skills are required." });
  }

  skills.forEach((skill) => {
    const checkSkillExist = "SELECT id FROM skillset WHERE skills = ?";
    conn_sql.query(checkSkillExist, [skill], (err, skillResult) => {
      if (err) return console.error("Error checking skill:", err);

      if (skillResult.length === 0) {
        // Skill doesn't exist, insert it
        const insertSkillQuery = "INSERT INTO skillset (skills) VALUES (?)";
        conn_sql.query(insertSkillQuery, [skill], (err, insertResult) => {
          if (err) return console.error("Error inserting skill:", err);
          const newSkillId = insertResult.insertId;
          addSkillToUser(id, newSkillId, skill);
        });
      } else {
        const existingSkillId = skillResult[0].id;
        addSkillToUser(id, existingSkillId, skill, res);
      }
    });
  });

  function addSkillToUser(userId, skillId, skillName, res) {
    const checkDuplicate = `
      SELECT * FROM jobseeker_skills WHERE job_seeker_id = ? AND skillset_id = ?
    `;
  
    conn_sql.query(checkDuplicate, [userId, skillId], (err, result) => {
      if (err) {
        console.error("Duplicate check error:", err);
        return res.status(500).json({ msg: "Error checking duplicate", err });
      }
  
      if (result.length > 0) {
        return res.status(200).json({ msg: `Skill "${skillName}" is already added` });
      }
  
      const insertUserSkill = `
        INSERT INTO jobseeker_skills (job_seeker_id, skillset_id)
        VALUES (?, ?)
      `;
  
      conn_sql.query(insertUserSkill, [userId, skillId], (err) => {
        if (err) {
          console.error("Error inserting jobseeker skill:", err);
          return res.status(500).json({ msg: "Error inserting skill", err });
        }
  
        return res.status(200).json({ msg: `Skill "${skillName}" added successfully` });
      });
    });
  }
  

  // res.status(200).json({ msg: "Skills processing." });
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
  ApplyForJob,
  Addskillset,
  DeleteFromTable,
  CancleApplication,
  Apply,
  AddToWishlist,
};
