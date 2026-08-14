const { conn_sql } = require("../../config/connection");

const GetSkills = (req, res) => {
  const sql = "SELECT * FROM `skillset`";
  conn_sql.query(sql, (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      const formatedData = data.map((res) => ({
        value: res.skills.toLowerCase().replace(/\s+/g, "_"),
        label: res.skills,
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
    "SELECT jobseeker_skills.id as candidateSkillId, skillset.skills as candidateSkillName FROM `jobseeker_skills` JOIN skillset ON jobseeker_skills.skillset_id = skillset.id WHERE jobseeker_skills.job_seeker_id = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

const RemoveCandidateSkills = (req, res) => {
  const { id } = req.params;

  conn_sql.query("SELECT job_seeker_id FROM `jobseeker_skills` WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Skill not found" });
    }
    if (!req.user || String(rows[0].job_seeker_id) !== String(req.user.id)) {
      return res.status(403).json({ msg: "You do not have access to this skill" });
    }

    const sql = "DELETE FROM `jobseeker_skills` WHERE `id` = ?";
    conn_sql.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      }
      return res.json({ msg: "Skill removed!!!" });
    });
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
