const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcrypt");

const upload = require("../../middleware/upload"); 

//Employee registeration
const employeesignup = (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    role,
    phone,
  } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    
    const sql_check = "SELECT * FROM `user_accounts` WHERE email = ?";
    conn_sql.query(sql_check,[email], (err, result) => {
      if (err) throw err;
      if(result.length >0){
        return res.json ({msg: "Email Already Exists!"});
      }
      else{
      const sql_signup =
        "INSERT INTO `user_accounts`(`first_name`, `last_name`, `username`, `email`,`password`, `role`, `phone`) VALUES (? , ?, ?, ?, ?, ?, ?)";
      conn_sql.query(
        sql_signup,
        [
          first_name,
          last_name,
          username,
          email,
          hash,
          // password,
          role,
          phone
        ],
        (err, result) => {
          if (err) throw err;
          else {
            return res.json({ msg: "Registered Successfully!", result });
          }
        }
      );
    }
    })
    
  });
};

//Employee login
const employeelogin = (req, res) => {
  const { email, password} = req.body.payload;

  const sql = "SELECT * FROM `user_accounts` WHERE `email`= ?";

  conn_sql.query(sql, [email], (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      let user = data[0];
      if (user.account_status === 0) {
        return res.json({ isloggedin: false, msg: "Your account is frozen. Please contact support." });
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (data) {
          return res.json({isloggedin: true, msg: "Login Successfully !...", data });
        } else {
          return res.json({ msg: "Invalid User" });
        }
      });
    }
     else {
      return res.json({ msg: "User not exist!!!" });
    }
  });
};

// Employee Update Profile
const EmployeeProfile = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const { id } = req.params;
  const { first_name, last_name, email } = bodyData;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  console.log(bodyData);
  console.log(imageUrl);
  // bcrypt.hash(password, 10, function (err, hash) {
  const sqladmin =
    "UPDATE `user_accounts` SET `first_name`=? , `last_name`=? , `email`= ?, `image` = ? WHERE id=?";
    conn_sql.query(
    sqladmin,
    [first_name, last_name, email, imageUrl, id],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({ message: "Profile updated...", result});
      }
    }
  );
// });
};


const EmployeeChangePassword = (req, res) => {
  const { id } = req.params;
  const { currentPass, newPass } = req.body.editPasswordData;

  const checkPasswordQuery = "SELECT password FROM `user_accounts` WHERE id = ?";

  conn_sql.query(checkPasswordQuery, [id], (err, results) => {
    if (err) {
      return res.json({ msg: "Database error", err });
    }

    if (results.length === 0) {
      return res.json({ msg: "Not found" });
    }

    const storedHashedPassword = results[0].password;

    // Compare current password with hashed password
    bcrypt.compare(currentPass, storedHashedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        return res.json({ msg: "Error comparing passwords", compareErr });
      }

      if (!isMatch) {
        return res.json({ msg: "Current password is incorrect" });
      }

      // Hash the new password
      bcrypt.hash(newPass, 10, (hashErr, hashedNewPass) => {
        if (hashErr) {
          return res.json({ msg: "Error hashing new password", hashErr });
        }

        const updatePasswordQuery = "UPDATE `user_accounts` SET `password` = ? WHERE id = ?";
        conn_sql.query(updatePasswordQuery, [hashedNewPass, id], (updateErr, updateResult) => {
          if (updateErr) {
            return res.json({ msg: "Failed to update password", updateErr });
          }

          return res.json({ msg: "Password updated successfully", updateResult });
        });
      });
    });
  });
};


const GetEmployee = (req, res) => {
  const {id} = req.params;
  const sql_get = "SELECT * FROM `user_accounts` WHERE id = ?";
  conn_sql.query(sql_get, [id],(err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

// Employer Dasboard Graph
const EmployerGraph = (req, res) => {
  const { id } = req.params;

  const days = parseInt(req.params.days) || 7;
 console.log("days are",days);
  const sql = `
      SELECT DATE(created_at) AS name, COUNT(id) AS visits 
      FROM applicants 
      WHERE employee_id = ? 
      AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) 
      GROUP BY DATE(created_at) 
      ORDER BY name
  `;

  conn_sql.query(sql, [id, days], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    console.log(result);
    res.json(result);
  });
};

module.exports = { employeesignup, employeelogin, EmployeeProfile , GetEmployee, EmployeeChangePassword, EmployerGraph};
