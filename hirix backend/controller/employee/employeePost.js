const { conn_sql } = require("../../config/connection");

// Post job
const PostJob = (req, res) => {
  const { id } = req.params;
  const {
    title,
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
    company_name,
    time,
    salary,
    required_skills,
    location,
  } = req.body;
  const sql_getpost =
    "SELECT user_account_id FROM companies WHERE user_account_id = ?";
  conn_sql.query(sql_getpost, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      if (result.length > 0) {
        const sqlpost =
          "INSERT INTO `jobs` (`employee_id`,`title`,`description`, `job_type` ,`career_level`, `Experience`, `qualification`,`available_seats`, `gender`,`currency`, `minimum_currency`, `maximum_currency`, `company_name`, `time`, `salary`,`required_skills`, `location`) VALUES (?,?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?, ?)";
        conn_sql.query(
          sqlpost,
          [
            id,
            title,
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
            company_name,
            time,
            salary,
            required_skills,
            location,
          ],
          (err, result) => {
            if (err) {
              return res.json(err);
            } else {
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

// Edit job Posts
const editposts = (req, res) => {
  const { id } = req.params;
  const {
    title,
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
    company_name,
    time,
    salary,
    required_skills,
    location,
  } = req.body;
  const sqleditpost =
    "UPDATE `jobs` SET `title`=? ,`description`=? ,`job_type`=? ,`career_level`=? , `Experience` =? , `qualification` =? ,`available_seats` =? ,`gender` = ? , `currency` =? , `minimum_currency`= ? , `maximum_currency`=? , `company_name`=? ,`time`=? , `salary`=? ,`required_skills`=? , `location` = ?  WHERE id=?";
  conn_sql.query(
    sqleditpost,
    [
      title,
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
      company_name,
      time,
      salary,
      required_skills,
      location,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({ msg: "Updated...", result });
      }
    }
  );
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
  const sql_status = "UPDATE `jobs` SET `status`= 'Opening' WHERE id=?";
  conn_sql.query(sql_status, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Status Updated...", result });
    }
  });
};

// Job Post's status (Pause)
const status_pause = (req, res) => {
  const { id } = req.params;
  const sql_status_pause = "UPDATE `jobs` SET `status`= 'Pause' WHERE id=?";
  conn_sql.query(sql_status_pause, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Status Updated...", result });
    }
  });
};

// job Post's status (Closed)
const delposts = (req, res) => {
  const { id } = req.params;
  const sqldelpost = "UPDATE `jobs` SET `status`= 'Closed' WHERE id=?";
  conn_sql.query(sqldelpost, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Status Updated...", result });
    }
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
  const { id } = req.params;
  const sql_get = "SELECT * FROM `jobs` WHERE `employee_id` = ?";
  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
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
};
