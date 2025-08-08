const { conn_sql } = require("../../config/connection");

const GetSkills = (req, res) => {
  const sql = "SELECT * FROM `skillset`";
  conn_sql.query(sql, (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      const formatedData = data.map((res) => ({
        value: res.name.toLowerCase().replace(/\s+/g, "_"),
        label: res.name,
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

module.exports = {
  GetSkills,
  GetJobCategory,
  GetSubCategory,
};
