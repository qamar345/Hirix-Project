const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcryptjs");

const upload = require("../../middleware/upload"); 

const { SendAccountCreatedEmail } = require("../../mailer/AccountRegisteration");

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
      if (result.length >0){
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
          role,
          phone
        ],
        (err, result) => {
          if (err) throw err;
          else {
            // console.log(result);
            console.log("Email going to:", email);
            SendAccountCreatedEmail(email);
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
  const { email, password } = req.body.payload;

  const sql = "SELECT * FROM `user_accounts` WHERE `email`= ?";

  conn_sql.query(sql, [email], (err, data) => {
    if (err) throw err;
    
    if (data.length > 0) {
      let user = data[0];
      
      // Check if the user's account is frozen
      if (user.account_status === 0) {
        return res.json({ isloggedin: false, msg: "Your account is frozen. Please contact support." });
      }

      // Compare password
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({ msg: "Error comparing passwords." });
        }

        if (result) {
          // If passwords match, return success
          return res.json({ isloggedin: true, msg: "Login successful!", data: user });
        } else {
          // If passwords don't match
          return res.json({ isloggedin: false, msg: "Invalid email or password." });
        }
      });
    } else {
      // If no user found
      return res.json({ isloggedin: false, msg: "User does not exist." });
    }
  });
};


// Employee Update Profile
const EmployeeProfile = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const { id } = req.params;
  const { first_name, last_name, email } = bodyData;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const sqlUpdate = `
    UPDATE user_accounts 
    SET first_name = ?, last_name = ?, email = ?, image = ?
    WHERE id = ?
  `;

  conn_sql.query(sqlUpdate, [first_name, last_name, email, imageUrl, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Update failed", error: err });
    }
    const sqlSelect = "SELECT id, first_name, image FROM user_accounts WHERE id = ?";
    conn_sql.query(sqlSelect, [id], (selectErr, selectResult) => {
      if (selectErr) {
        return res.status(500).json({ message: "Error fetching updated user", error: selectErr });
      }

      return res.json({
        message: "Profile updated...",
        result: selectResult[0], // 👈 updated user
      });
    });
  });
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

// Get Employee with his registerd companies
const GetEmpAndCom = (req, res) => {
  const { id } = req.params;

  const sql_get_employee = "SELECT * FROM `user_accounts` WHERE id = ?";
  const sql_get_companies = "SELECT * FROM `companies` WHERE user_account_id = ?";
  conn_sql.query(sql_get_employee, [id], (err, employeeResult) => {
    if (err) return res.status(500).json({ error: err });

    if (employeeResult.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    conn_sql.query(sql_get_companies, [id], (err2, companyResult) => {
      if (err2) return res.status(500).json({ error: err2 });

      return res.json({
        employee: employeeResult[0],
        companies: companyResult    
      });
    });
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

// generate unique username

function generateUsernameFormatStyle(firstName, lastName) {
  const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const randomNum = Math.floor(1000 + Math.random() * 9000);

  const fn = capitalize(firstName || "");
  const ln = capitalize(lastName || "");

  return `${fn}${ln}${randomNum}`;
}

const GenerateUserName = (req, res) => {
  const { firstName, lastName } = req.query;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "First name and last name are required" });
  }

  // Check if the username already exists
  function checkUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM user_accounts WHERE username = ?`;
      conn_sql.query(sql, [username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0);  // Resolves true if username exists, false if it does not
        }
      });
    });
  }

  // Function to generate a unique username
  async function generateUniqueUsername() {
    let username;
    let exists = true;

    while (exists) {
      username = generateUsernameFormatStyle(firstName, lastName); 
      exists = await checkUsername(username);  // Check if the username already exists in the database
    }

    // Once a unique username is found, send the response
    res.json({ username });
  }

  // Start the process of generating a unique username
  generateUniqueUsername().catch((error) => {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  });
};





module.exports = { employeesignup, employeelogin, EmployeeProfile , GetEmployee, GetEmpAndCom, EmployeeChangePassword, EmployerGraph, GenerateUserName};
