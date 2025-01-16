const { conn_sql } = require("../../config/connection");
const { VerifyEmail } = require("../../mailer/mailer-controller");
const bcrypt = require("bcrypt");

// get All job posts
const Getposts = (req, res) => {
  const sql_get = "SELECT * FROM `jobs`";
  conn_sql.query(sql_get, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

// getPosts by id
const Getpostbyid = (req, res) => {
  const { id } = req.params;
  const sql_get = "SELECT * FROM `jobs` WHERE id=?";
  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

//put filters
const filters = (req, res) => {
  const { title, job_type, time, salary, required_skills, location } = req.body;
  const sql_filters =
    "SELECT * FROM `jobs` WHERE `title`=? OR `job_type`=? OR `time`= ? OR `salary`=? OR `required_skills`=? OR `location`=?";
  conn_sql.query(
    sql_filters,
    [title, job_type, time, salary, required_skills, location],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    }
  );
};

// get reviews
const Getreviews = (req, res) => {
  const sql_get = "SELECT * FROM `reviews`";
  conn_sql.query(sql_get, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

//VerifyEmail
const SendCode = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ msg: "Enter your email address" });
  }
  const sql_verify = "SELECT email FROM `user_accounts` WHERE email = ?";
  conn_sql.query(sql_verify, [email], (err, result) => {
    if (result.length === 0) {
      return res.json({ message: "Invalid Email" });
    } else {
      const Token = Math.floor(1000 + Math.random() * 9000);
      const sql_store_token =
        "INSERT INTO `verifyemail` (`email`,`token`) VALUES (?, ?)";
      conn_sql.query(sql_store_token, [email, Token], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.json({ msg: "Verification Code Already Send!!!" });
          }
        } else {
          VerifyEmail(email, Token);
          return res.json(result);
        }
      });
    }
  });
};
//Forget Password
const forgetPassword = (req, res) => {
  const { id } = req.params;
  const { token, password } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
  const sql_token = "SELECT token FROM `verifyemail` WHERE token = ?";
  conn_sql.query(sql_token, [token], (err, result) => {
    if (result[0].token === parseInt(token)) {
      const sql_forget =
        "UPDATE `user_accounts` SET `password` = ? WHERE id= ?";
      conn_sql.query(sql_forget, [hash, id], (err, result) => {
        if (err) throw err;
        else {
          return res.json({
            message: "Updated Password Successfully!",
            result
          });
        }
      });
    }
  });
});
};

module.exports = {
  Getposts,
  Getpostbyid,
  Getreviews,
  filters,
  forgetPassword,
  SendCode,
};
