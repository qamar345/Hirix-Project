const nodemailer = require("nodemailer");
require("dotenv").config();

const SendAccountCreatedEmail = (email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: parseInt(process.env.MAILPORT),
    secure: true,
    auth: {
      user: process.env.MAILERUSER,
      pass: process.env.MAILERPASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"Hirix Support" <${process.env.MAILERUSER}>`,
    to: email,
    subject: "Welcome to Hirix Pakistan - Account Created Successfully",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Created Successfully</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      border: 1px solid #e2e8f0;
    }
    .header {
      background-color: #00743f;
      padding: 35px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px 30px;
      text-align: center;
      color: #334155;
    }
    .content h2 {
      font-size: 22px;
      margin-top: 0;
      color: #0f172a;
      font-weight: 600;
    }
    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 24px;
    }
    .btn {
      display: inline-block;
      background-color: #00743f;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 12px 30px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 116, 63, 0.2);
      transition: all 0.2s ease;
    }
    .btn:hover {
      background-color: #005a30;
    }
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>HIRIX PAKISTAN</h1>
      </div>
      <div class="content">
        <h2>Welcome to Hirix!</h2>
        <p>Your account has been <strong>created successfully</strong> on our Job Portal platform.</p>
        <p>You can now log in, build your professional profile, post job openings, and start exploring active listings.</p>
        <a href="https://hirix.pk" class="btn" target="_blank">Go to Dashboard</a>
      </div>
      <div class="footer">
        <p>This is an automated verification email. Please do not reply directly to this message.</p>
        <p>&copy; 2026 Hirix Pakistan. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email Error:", error);
    } else {
      console.log("Account creation email sent:", info.response);
    }
  });
};

module.exports = { SendAccountCreatedEmail };
