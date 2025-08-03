const { conn_sql } = require("../../config/connection");

const GetSkills = (req, res) => {
  const sql = "SELECT * FROM `skillset`";
  conn_sql.query(sql, (err, data) => {
    if (err) throw err;

    const formatedData = data.map((res) => ({
      value: res.skills.toLowerCase().replace(/\s+/g, "_"),
      label: res.skills,
    }));

    return res.json(formatedData);
  });
};

module.exports = {
  GetSkills,
};
