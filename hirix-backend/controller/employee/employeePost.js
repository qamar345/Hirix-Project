const { conn_sql } = require("../../config/connection");

// Confirms the job at :id belongs to the authenticated employee (or the
// caller is an admin) before allowing a read/mutation. Calls onOwned(job)
// on success, otherwise responds 403/404/500 itself.
function withJobOwnership(req, res, onOwned) {
  const { id } = req.params;
  conn_sql.query("SELECT id, employee_id FROM jobs WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Job not found" });
    }
    const job = rows[0];
    const isOwner = req.user && String(job.employee_id) === String(req.user.id);
    const isAdmin = req.user && req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "You do not have access to this job posting" });
    }
    onOwned(job);
  });
}

// Post job
const PostJob = (req, res) => {
  const { id } = req.params;

  const {
    title,
    job_category,
    job_subcategory,
    description,
    job_type,
    workplace_type,
    career_level,
    Experience,
    qualification,
    available_seats,
    gender,
    currency,
    minimum_currency,
    maximum_currency,
    Rate,
    Email,
    Url,
    Phone,
    company_name,
    required_skills,
    expiry_date,
    salary,
    ApplyType,
    province,
    city,
  } = req.body;
  let skillsString = Array.isArray(required_skills)
    ? required_skills.join(",")
    : required_skills;
  const sql_getpost =
    "SELECT user_account_id FROM companies WHERE user_account_id = ?";
  conn_sql.query(sql_getpost, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      console.log(id);
      if (result.length > 0) {
        const sqlpost =
          "INSERT INTO `jobs` (`employee_id`,`title`,`job_category`, `job_subcategory`, `description`, `job_type`,`workplace_type` ,`career_level`, `Experience`, `qualification`,`available_seats`, `gender`,`currency`, `minimum_currency`, `maximum_currency`,`Rate`,`Email`,`Url`,`Phone`,`company_name`,`required_skills`,`expiry_date`,`salary`,`ApplyType`,`province`,`city`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        conn_sql.query(
          sqlpost,
          [
            id,
            title,
            job_category,
            job_subcategory,
            description,
            job_type,
            workplace_type,
            career_level,
            Experience,
            qualification,
            available_seats,
            gender,
            currency,
            minimum_currency,
            maximum_currency,
            Rate,
            Email,
            Url,
            Phone,
            company_name,
            skillsString,
            expiry_date,
            salary,
            ApplyType,
            province,
            city,
            // location,
          ],
          (err, result) => {
            if (err) {
              // return res.json(err);
              console.log(err);
              return res.json({
                msg: "Something went wrong while posting the job.",
              });
            } else {
              console.log(result);
              return res.json({ msg: "Posted...", result });
            }
          }
        );
      } else {
        return res.json({ msg: "Please! Add your company first" });
      }
    }
  });
};
// job save as a draft
const draftJob = (req, res) => {
  const { id } = req.params;

  const {
    title,
    job_category,
    job_subcategory,
    description,
    job_type,
    workplace_type,
    career_level,
    Experience,
    qualification,
    available_seats,
    gender,
    currency,
    minimum_currency,
    maximum_currency,
    Rate,
    Email,
    Url,
    Phone,
    company_name,
    required_skills,
    expiry_date,
    salary,
    ApplyType,
    province,
    city,
  } = req.body;
  let skillsString = Array.isArray(required_skills)
    ? required_skills.join(",")
    : required_skills;
  const sql_getpost =
    "SELECT user_account_id FROM companies WHERE user_account_id = ?";
  conn_sql.query(sql_getpost, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      console.log(id);
      if (result.length > 0) {
        const sqlpost =
          "INSERT INTO `jobs` (`employee_id`,`title`,`job_category`, `job_subcategory`, `description`, `job_type`,`workplace_type` ,`career_level`, `Experience`, `qualification`,`available_seats`, `gender`,`currency`, `minimum_currency`, `maximum_currency`,`Rate`,`Email`,`Url`,`Phone`,`company_name`,`required_skills`,`expiry_date`,`salary`,`ApplyType`,`province`,`city`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'Draft')";

        conn_sql.query(
          sqlpost,
          [
            id,
            title,
            job_category,
            job_subcategory,
            description,
            job_type,
            workplace_type,
            career_level,
            Experience,
            qualification,
            available_seats,
            gender,
            currency,
            minimum_currency,
            maximum_currency,
            Rate,
            Email,
            Url,
            Phone,
            company_name,
            skillsString,
            expiry_date,
            salary,
            ApplyType,
            province,
            city,
            // location,
          ],
          (err, result) => {
            if (err) {
              // return res.json(err);
              console.log(err);
              return res.json({ msg: "Something went wrong..." });
            } else {
              console.log(result);
              return res.json({
                msg: "Job saved as draft successfully",
                result,
              });
            }
          }
        );
      } else {
        return res.json({ msg: "Please! Add your company first" });
      }
    }
  });
};

// Edit job Posts
const editposts = (req, res) => {
  const { id } = req.params;
  const {
    title,
    job_category,
    description,
    job_type,
    career_level,
    Experience,
    qualification,
    available_seats,
    gender,
    currency,
    minimum_currency,
    maximum_currency,
    Rate,
    Email,
    Url,
    Phone,
    company_name,
    required_skills,
    salary,
    ApplyType,
    province,
    city,
  } = req.body;

  withJobOwnership(req, res, () => {
    const sqleditpost =
      "UPDATE `jobs` SET `title`=? ,`job_category`=? ,`description`=? ,`job_type`=? ,`career_level`=? , `Experience` =? , `qualification` =? ,`available_seats` =? ,`gender` = ? , `currency` =? , `minimum_currency`= ? , `maximum_currency`=? ,`Rate`=?,`Email`=?, `Url`=?, `Phone`=?, `company_name`=? , `salary`=? ,`required_skills`=? ,`ApplyType`=?, `province`=?, `city`=?  WHERE id=?";
    conn_sql.query(
      sqleditpost,
      [
        title,
        job_category,
        description,
        job_type,
        career_level,
        Experience,
        qualification,
        available_seats,
        gender,
        currency,
        minimum_currency,
        maximum_currency,
        Rate,
        Email,
        Url,
        Phone,
        company_name,
        salary,
        required_skills,
        ApplyType,
        province,
        city,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Database error" });
        } else {
          return res.json({ msg: "Updated...", result });
        }
      }
    );
  });
};

//Job required_skills mentioned
// const required_skills = (req, res) => {
//   const {id} = req.params;  // job_id
//   const {skills} = req.body;  // skill name

//   // First, select the skillset id based on the name provided
//   const sql_select_skill = "SELECT id FROM skillset WHERE skills = ?";

//   conn_sql.query(sql_select_skill, [skills], (err, result) => {
//     if (err) {
//       return res.json(err);
//     }

//     // Check if the skill exists
//     if (result.length === 0) {
//       return res.status(404).json({message: "Skill not found"});
//     }

//     const skillsetId = result[0].id;

//     // Now insert the job_id and the fetched skillset_id into the job_required_skills table
//     const sql_insert = "INSERT INTO job_required_skills (job_id, skillset_id) VALUES (?, ?)";
//     conn_sql.query(sql_insert, [id, skillsetId], (err, result) => {
//       if (err) {
//         return res.json(err);
//       } else {
//         return res.json(result);
//       }
//     });
//   });
// };

// Job Post's status (opening)
const post_status = (req, res) => {
  const { id } = req.params;
  withJobOwnership(req, res, () => {
    const sql_status = "UPDATE `jobs` SET `status`= 'Open' WHERE id=?";
    conn_sql.query(sql_status, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Status Updated...", result });
      }
    });
  });
};

// Job Post's status (Pause)
const status_pause = (req, res) => {
  const { id } = req.params;
  withJobOwnership(req, res, () => {
    const sql_status_pause = "UPDATE `jobs` SET `status`= 'Pause' WHERE id=?";
    conn_sql.query(sql_status_pause, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Status Updated...", result });
      }
    });
  });
};

// job Post's status (Closed)
const delposts = (req, res) => {
  const { id } = req.params;
  withJobOwnership(req, res, () => {
    const sqldelpost = "UPDATE `jobs` SET `status`= 'Closed' WHERE id=?";
    conn_sql.query(sqldelpost, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Status Updated...", result });
      }
    });
  });
};

// Job Post Delete
const jobDel = (req, res) => {
  const { id } = req.params;
  withJobOwnership(req, res, () => {
    const sql_del = "DELETE FROM `jobs` WHERE id=?";
    conn_sql.query(sql_del, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Not deleted yet!!" });
      } else {
        return res.json({ msg: "Job Deleted!", result });
      }
    });
  });
};
// Get specific Post
const GetJob = (req, res) => {
  const { id } = req.params;
  withJobOwnership(req, res, () => {
    const sql_get =
      " SELECT j.*, c.name AS company_name FROM jobs j LEFT JOIN companies c ON j.company_name = c.id WHERE j.id = ?";
    conn_sql.query(sql_get, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json(result);
      }
    });
  });
};

// // Add skillset in database

// const Addskillset = (req, res) => {
//   const { skills } = req.body;
//   const sqlskills = "INSERT INTO `skillset` (`skills`) VALUES (?)";
//   conn_sql.query(sqlskills, [skills], (err, result) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json({ msg: "Added...", result });
//     }
//   });
// };

// //Edit skillset in database

// const Editskillset = (req, res) => {
//   const {id} = req.params;
//   const { skills } = req.body;
//   const sqlskills = "UPDATE `skillset` SET `skills`=? WHERE id=?";
//   conn_sql.query(sqlskills, [skills, id], (err, result) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json({ msg: "Updated...", result });
//     }
//   });
// };

// get All job posts (only his posts)
const Gethisposts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = 10;
  const offset = (page - 1) * limit;
  const { id } = req.params;
  // const sql_get = "SELECT * FROM `jobs` WHERE `employee_id` = ? AND `title` LIKE ?  LIMIT ? OFFSET ?";
  const sql_get =
    "SELECT j.*,(SELECT COUNT(*) FROM applicants a WHERE a.job_id = j.id) AS total_applicants FROM jobs j WHERE j.employee_id = ? AND j.title LIKE ? LIMIT ? OFFSET ?";
  conn_sql.query(sql_get, [id, `%${search}%`, limit, offset], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      const sql = "SELECT COUNT(*) as count FROM jobs WHERE employee_id = ? AND title LIKE ?";

      conn_sql.query(sql, [id, `%${search}%`], (c_err, c_data) => {
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

// Select Companies of particular employer
const SelectCompanies = (req, res) => {
  const { id } = req.params;
  const query_select =
    "SELECT id, name FROM `companies` WHERE `user_account_id` =? AND `status`= 'Approved'";
  conn_sql.query(query_select, [id], (err, result) => {
    if (err) throw err;
    else {
      return res.json(result);
    }
  });
};

module.exports = {
  PostJob,
  editposts,
  delposts,
  post_status,
  status_pause,
  Gethisposts,
  jobDel,
  GetJob,
  SelectCompanies,
  draftJob,
};
