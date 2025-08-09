const { conn_sql } = require("../../config/connection");

const GetSkills = (req, res) => {
  const sql = "SELECT * FROM `skillset`";
  conn_sql.query(sql, (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      const formatedData = data.map((res) => ({
        value: res.name.toLowerCase().replace(/\s+/g, "_"),
        label: res.name,
        id: res.id,
      }));

      return res.json(formatedData);
    }
  });
};

const GetJobCategory = (req, res) => {
  const sql = "SELECT * FROM `job_categories`";
  conn_sql.query(sql, (err, jobCategory) => {
    if (err) return res.json(err);
    return res.json(jobCategory);
  });
};

const GetSubCategory = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `job_subcategories` WHERE `category_id` = ?";
  conn_sql.query(sql, [id], (err, subCategory) => {
    if (err) return res.json(err);
    return res.json(subCategory);
  });
};

const GetCandidateSkills = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT jobseeker_skills.id as candidateSkillId, skillset.name as candidateSkillName FROM `jobseeker_skills` JOIN skillset ON jobseeker_skills.skillset_id = skillset.id WHERE jobseeker_skills.job_seeker_id = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

const RemoveCandidateSkills = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM `jobseeker_skills` WHERE `id` = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) return res.json({ msg: err });
    return res.json({ msg: "Skill removed!!!" });
  });
};

const GetCandidateProjects = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM `user_projects` WHERE `user_id` = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

module.exports = {
  GetSkills,
  GetJobCategory,
  GetSubCategory,
  GetCandidateSkills,
  RemoveCandidateSkills,
  GetCandidateProjects,
};
