const nodemailer = require("nodemailer");
require("dotenv").config();

const VerifyEmail = (email, token) => {
  const link = `${process.env.URL}/${token}`;
  const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST, // replace with your SMTP host
    port: process.env.MAILPORT, // replace with your SMTP port
    service: "SMTP",
    secure: true, // true for 465, false for other ports
    // service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: process.env.MAILERUSER,
      pass: process.env.MAILERPASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"Hirix" <${process.env.MAILERUSER}>`,
    to: email,
    subject: "Verify Your Email Address - Hirix",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f4f6;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #0b1220;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #00c4a5;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px 30px;
      text-align: center;
      color: #374151;
    }
    .content h2 {
      font-size: 22px;
      margin-top: 0;
      color: #111827;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      background-color: #00c4a5;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 196, 165, 0.25);
      transition: all 0.2s ease;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      font-size: 13px;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 style="color: #00c4a5; font-family: sans-serif;">HIRIX</h1>
      </div>
      <div class="content">
        <h2>Verify Your Email Address</h2>
        <p>Thank you for signing up on the Hirix Job Portal. Please verify your email address by clicking the button below to activate your account.</p>
        <a href="${link}" class="btn" target="_blank">Verify Email Address</a>
        <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">If the button above doesn't work, copy and paste this link into your browser:<br><a href="${link}" style="color: #00c4a5; word-break: break-all;">${link}</a></p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply directly to this email.</p>
        <p>&copy; 2026 Hirix. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
module.exports = { VerifyEmail };
