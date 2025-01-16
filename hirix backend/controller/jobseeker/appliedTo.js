const { conn_sql } = require("../../config/connection");

// Tracking (this is for job seeker who wants to see his/her jobs where he/she applied to)
const appliedTo = (req, res) => {
  const { id } = req.params;
  const sql_applied = "SELECT * FROM `applicants` WHERE `job_seeker_id` = ?";
  conn_sql.query(sql_applied, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      if (result.length > 0) {
        for (let a = 1; a <= result.length; a++) {
          const sql_records =
            "SELECT jobs.id, jobs.title, jobs.job_type, jobs.time FROM `jobs` JOIN `applicants` ON jobs.id = applicants.job_id WHERE job_seeker_id=?";
          conn_sql.query(sql_records, [id], (err, result) => {
            if (err) {
              return res.json(err);
            } else {
              return res.json(result);
            }
          });
        }
      } else {
        return res.json({ msg: "Empty..." });
      }
    }
  });
};
// Apply for the job
const ApplyForJob = (req, res) => {
  const {id} = req.params;
  const {job_id} = req.query;
  const sql_get = "SELECT id AS job_id, employee_id FROM jobs WHERE id = ?";
  conn_sql.query(sql_get, [job_id], (err, result) => {
    if (err) throw err;
    else {
      const {employee_id} = result[0];
      const sql_apply =
      "INSERT INTO `applicants`(`job_seeker_id`,`employee_id`,`job_id`) VALUES (? ,?,  ?)";
    conn_sql.query(sql_apply, [id, employee_id, job_id], (err, result) => {
      if (err) throw err;
      else {
        return res.json({ msg: "Applied...", result });
      }
    });
    }
  });
}

  // Add skillset to fill form
  const Addskillset = (req, res) =>{
    const {id} = req.params;
    const {skills} = req.body;
    if (!skills){
      return res.json({msg: "Skills are compulsory to be mentioned..."});
    }
    const fetchskills = "SELECT id FROM skillset WHERE skills = ?";
    conn_sql.query(fetchskills, [skills], (err, result) =>{
      if (err) throw err;
        const insertskillsql = "INSERT INTO jobseeker_skills (job_seeker_id, skillset_id) VALUES (?,?)";
        conn_sql.query(insertskillsql, [id, result[0].id], (err, result) =>{
          if (err) throw err;
          else{
            return res.json({msg: "Skills added...",result});
          }
        });
    });
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

module.exports = { appliedTo, ApplyForJob, Addskillset };
