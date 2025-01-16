const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcrypt");

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
      if(role == "employee"){
        //humain yahan py domain name ko match krna hai company ki domain name ky sath 
        const employee_domain = email.split('@')[1];
        const sql_companyfetch = "SELECT E_mail FROM `companies`";
        conn_sql.query(sql_companyfetch,(err, result)=> {
          console.log(result);
          const companyEmail = result[0].E_mail.split('@')[1];
          console.log(companyEmail);
            if(employee_domain === companyEmail){
              return res.json ({msg: "match"});
              // hum email send krain gy company ki email py aur verification krain  gy phir data insert ho ga
            }else{
              return res.json ({msg: "Email does not match"})
            }
        });
      
      }
      else{
      const sql_signup =
        "INSERT INTO `user_accounts`(`first_name`, `last_name`, `username`, `email`, `password`, `role`, `phone`) VALUES (? , ? , ?,  ?, ?, ?, ?)";
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
  const { email, password, role } = req.body;

  const sql = "SELECT * FROM `user_accounts` WHERE `email`= ? AND `role`= ?";

  conn_sql.query(sql, [email, role], (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      let user = data[0];
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          return res.json({ msg: "Login Successfully !...", result });
        } else {
          return res.json({ msg: "Invalid User" });
        }
      });
    } else {
      return res.json({ msg: "User not exist!!!" });
    }
  });
};

// Employee Update Profile
const EmployeeProfile = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, image, email, password, qualification, location, phone } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
  const sqladmin =
    "UPDATE `user_accounts` SET `first_name`=? , `last_name`=? ,`username`= ?,`image`=?, `email`= ? , `password`= ?, `qualification`=?, `location`= ?, `phone`= ? WHERE id=?";
    conn_sql.query(
    sqladmin,
    [first_name, last_name, username, image, email, hash,qualification, location, phone, id],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({ msg: "Updated...", result });
      }
    }
  );
});
};

module.exports = { employeesignup, employeelogin, EmployeeProfile };
