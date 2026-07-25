const { conn_sql } = require("../config/connection");
const { v4: uuidv4 } = require("uuid");
const { VerifyEmail } = require("../mailer/mailer-controller");

const SendVerificationLink = (req, res) => {
  const { email } = req.body;
  const token = uuidv4();

  const sql = "INSERT INTO `verifyemail`(`email`, `token`) VALUES (?, ?)";
  conn_sql.query(sql, [email, token], (err, data) => {
    if (err) return res.json(err);
    VerifyEmail(email, token);
    return res.json({ msg: "Email verification link send to your email" });
  });
};

const VerifyEmailLink = (req, res) => {
  const { token } = req.params;

  const sql = "SELECT * FROM `verifyemail` WHERE `token` = ?";
  conn_sql.query(sql, [token], (err, data) => {
    if (err) {
      console.error("VerifyEmailLink Error 1:", err);
      return res.send("Something went wrong!!!");
    }

    if (data.length > 0) {
      const sql_verified =
        "UPDATE `verifyemail` SET `isVerified`= 1 WHERE `token` = ?";
      const html = `
    <!DOCTYPE html>
    <html>
    <head><title>Email Verified</title></head>
    <body style="font-family:sans-serif; text-align:center; margin-top:50px;">
      <h1 style="color:#00C4A5;">Email Verified ✅</h1>
      <p>Your email has been successfully verified.</p>
    </body>
    </html>
  `;

      conn_sql.query(sql_verified, [token], (err, confirmRes) => {
        if (err) {
          console.error("VerifyEmailLink Error 2:", err);
          return res.send("Something went wrong!!!");
        }
        if (confirmRes) return res.send(html);
      });
    } else {
      const errorHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Verification Failed</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f8f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      .box {
        background: #fff;
        padding: 30px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #ff4d4f;
        margin-bottom: 10px;
      }
      p {
        color: #555;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>❌ Verification Failed</h1>
      <p>Invalid or expired link.</p>
    </div>
  </body>
</html>
`;
      return res.send(errorHtml);
    }
  });
};

const CheckMailStatus = (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.json("Email is required!!!");
  } else {
    const sql = "SELECT `isVerified` FROM `verifyemail` WHERE `email` = ?";
    conn_sql.query(sql, [email], (err, data) => {
      if (err) {
        return res.json({ isVerified: false });
      } else {
        return res.json(
          data.length > 0 ? { isVerified: true } : { isVerified: false }
        );
      }
    });
  }
};

module.exports = {
  SendVerificationLink,
  VerifyEmailLink,
  CheckMailStatus,
};
