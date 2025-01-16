const { conn_sql } = require("../../config/connection");
// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

//Admin login
const Adminlogin = (req, res) => {
  const { email, password } = req.body;
  const sqladminlogin =
    "SELECT * FROM `admin-account` WHERE `email`= ? AND `password` = ?";
  conn_sql.query(sqladminlogin, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.json({ userStatus: false });
    }

    const admin = result[0];
    // console.log(admin)
    // const isPasswordValid = bcrypt.compareSync(password, admin[0].password);
    // if (!isPasswordValid) {
    //   return res.json({ passwordStatus: false });
    // }
    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign({ email: admin.email }, secretKey, {
      expiresIn: 86400,
    });
    return res.json({ loginStatus: true, token, admin });
  });
};
// Middleware to verify token
const secretKey = process.env.SECRETKEY;

// Admin Update Profile
const AdminProfile = (req, res) => {
  const { id } = req.params;
  const { name, image, email, password } = req.body;
  const sqladmin =
    "UPDATE `admin-account` SET `name`= ?,`image`= ?, `email`= ? , `password`= ? WHERE id=?";
  conn_sql.query(
    sqladmin,
    [name, image, email, password, id],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({ msg: "Profile updated...", result });
      }
    }
  );
};

module.exports = { Adminlogin, AdminProfile };
