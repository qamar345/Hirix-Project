const { conn_sql } = require("../config/connection");
const { v4: uuidv4 } = require("uuid");
const { VerifyEmail } = require("../mailer/mailer-controller");

const SendVerificationLink = (req, res) => {
  const { email } = req.body;
  const token = uuidv4();

  const sql = "INSERT INTO `verifyemail`(`email`, `token`, `isVerified`) VALUES (?, ?, 0) ON DUPLICATE KEY UPDATE `token` = ?, `isVerified` = 0";
  conn_sql.query(sql, [email, token, token], async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }

    try {
      await VerifyEmail(email, token);
      return res.json({ msg: "Email verification link sent to your email" });
    } catch (mailErr) {
      console.error("Failed to send verification email:", mailErr.message || mailErr);
      return res.status(502).json({
        msg: "We couldn't send the verification email right now. Please try again in a moment, or contact support if this keeps happening.",
      });
    }
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
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified - Hirix</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0b1220;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #101827;
      border: 1px solid #1f2937;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      max-width: 400px;
      width: 90%;
    }
    .icon {
      font-size: 60px;
      color: #00c4a5;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #ffffff;
    }
    p {
      color: #9ca3af;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>Email Verified</h1>
    <p>Your email has been successfully verified. You can now close this window and proceed with signing up on the portal.</p>
  </div>
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
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Failed - Hirix</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0b1220;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #101827;
      border: 1px solid #1f2937;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      max-width: 400px;
      width: 90%;
    }
    .icon {
      font-size: 60px;
      color: #ef4444;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #ffffff;
    }
    p {
      color: #9ca3af;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✗</div>
    <h1>Verification Failed</h1>
    <p>The verification link is invalid, expired, or has already been used. Please try requesting a new link from the registration page.</p>
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
          data.length > 0 && data[0].isVerified === 1 ? { isVerified: true } : { isVerified: false }
        );
      }
    });
  }
};

const VerifyCompanyEmail = (req, res) => {
  const { token } = req.params;

  const sql = "SELECT * FROM `companies` WHERE `email_verification_token` = ?";
  conn_sql.query(sql, [token], (err, data) => {
    if (err) {
      console.error("VerifyCompanyEmail Error 1:", err);
      return res.send("Something went wrong!!!");
    }

    if (data.length > 0) {
      const company = data[0];
      const sql_verified =
        "UPDATE `companies` SET `is_email_verified`= 1 WHERE `email_verification_token` = ?";
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Company Verified - Hirix</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0b1220;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #101827;
      border: 1px solid #1f2937;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      max-width: 400px;
      width: 90%;
    }
    .icon {
      font-size: 60px;
      color: #00c4a5;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #ffffff;
    }
    p {
      color: #9ca3af;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>Company Verified</h1>
    <p>Your company <strong>${company.name}</strong> has been successfully verified via official email domain.</p>
  </div>
</body>
</html>
      `;

      conn_sql.query(sql_verified, [token], (err, confirmRes) => {
        if (err) {
          console.error("VerifyCompanyEmail Error 2:", err);
          return res.send("Something went wrong!!!");
        }
        if (confirmRes) return res.send(html);
      });
    } else {
      const errorHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Failed - Hirix</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0b1220;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #101827;
      border: 1px solid #1f2937;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      max-width: 400px;
      width: 90%;
    }
    .icon {
      font-size: 60px;
      color: #ef4444;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #ffffff;
    }
    p {
      color: #9ca3af;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✗</div>
    <h1>Verification Failed</h1>
    <p>The company verification link is invalid, expired, or has already been used.</p>
  </div>
</body>
</html>
      `;
      return res.send(errorHtml);
    }
  });
};

module.exports = {
  SendVerificationLink,
  VerifyEmailLink,
  CheckMailStatus,
  VerifyCompanyEmail,
};
