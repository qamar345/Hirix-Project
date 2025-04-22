const { conn_sql } = require("../../config/connection");

// Add Manager
const AddManager = (req, res) => {
  const { FirstName, email, role, phone, City, province } = req.body;
  const sql_addManager =
    "INSERT INTO `admin-account`(`FirstName`, `email`, `role`, `phone`, `City`, `province`) VALUES (? , ? , ?,  ?, ?, ?)";
  conn_sql.query(
    sql_addManager,
    [FirstName, email, role, phone, City, province],
    (err, result) => {
      if (err) throw err;
      else {
        return res.json({ msg: "Registered Successfully!", result });
      }
    }
  );
};

module.exports = {AddManager};