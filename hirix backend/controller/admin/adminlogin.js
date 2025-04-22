const { conn_sql } = require("../../config/connection");
// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const upload = require("../../middleware/upload"); 


//Admin login
const Adminlogin = (req, res) => {
  const { email, password } = req.body;
  const sqladminlogin =
    "SELECT * FROM `admin-account` WHERE `email`= ? AND `password` = ?";
  conn_sql.query(sqladminlogin, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.json({ userStatus: false, message: "Invalid email or password" });
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
    return res.json({ loginStatus: true, token, admin, message: "Login Successfully!"});
  });
};
// Middleware to verify token
const secretKey = process.env.SECRETKEY;

// Admin Update Profile
const AdminProfile = (req, res) => {
  const bodyData = Object.assign({}, req.body);
    const { id } = req.params;
  const { FirstName, LastName, email } = bodyData;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const sqladmin =
    "UPDATE `admin-account` SET `FirstName`= ?, `LastName`= ?, `email`= ?, `image`= ? WHERE id=?";
  conn_sql.query(
    sqladmin,
    [FirstName, LastName, email, imageUrl, id],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({ message: "Profile updated...", result });
      }
    }
  );
};


// Admin Update Password
const AdminChangePassword = (req, res) => {
  const { id } = req.params;
  const { currentPass, newPass } = req.body.editPasswordData;
  const checkPasswordQuery = "SELECT password FROM `admin-account` WHERE id = ?";
  
  conn_sql.query(checkPasswordQuery, [id], (err, results) => {
    if (err) {
      return res.json({ msg: "Database error",err });
    }
    
    if (results.length === 0) {
      return res.json({msg: "Admin not found" });
    }

    const storedPassword = results[0].password;

    if (storedPassword !== currentPass) {
      return res.json({ msg: "Current password is incorrect" });
    }
    const updatePasswordQuery = "UPDATE `admin-account` SET `password`= ? WHERE id=?";
    conn_sql.query(updatePasswordQuery, [newPass, id], (updateErr, updateResult) => {
      if (updateErr) {
        return res.json({ msg: "Failed to update password",updateErr });
      }
      return res.json({ msg: "Password updated successfully",updateResult });
    });
  });

};

 
const GetAdmin = (req, res) => {
  const {id} = req.params;
  const sql_get = "SELECT * FROM `admin-account` WHERE id = ?";
  conn_sql.query(sql_get, [id],(err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

module.exports = { Adminlogin, AdminProfile , GetAdmin, AdminChangePassword};
