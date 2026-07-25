const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a global transporter
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

const VerifyEmail = (email, token) => {
  const link = `${process.env.URL}/${token}`;

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

const SendCompanyVerificationEmail = (email, token, companyName) => {
  const isLocal = process.env.URL.includes("localhost");
  const link = isLocal
    ? `http://localhost:9000/verify-company-email/${token}`
    : `https://api.hirix.com.pk/verify-company-email/${token}`;

  const mailOptions = {
    from: `"Hirix" <${process.env.MAILERUSER}>`,
    to: email,
    subject: `Verify Official Email for ${companyName} - Hirix`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Company Verification</title>
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
      background-color: #00743f;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
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
      background-color: #00743f;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 116, 63, 0.25);
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
        <h1 style="color: #ffffff; font-family: sans-serif; margin: 0;">HIRIX</h1>
      </div>
      <div class="content">
        <h2>Verify Company Domain Email</h2>
        <p>You have registered the company <strong>${companyName}</strong> on the Hirix Job Portal. Please verify this official email address by clicking the button below to complete your company registration.</p>
        <a href="${link}" class="btn" target="_blank">Verify Company Email</a>
        <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">If the button above doesn't work, copy and paste this link into your browser:<br><a href="${link}" style="color: #00743f; word-break: break-all;">${link}</a></p>
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending company verification email:", error);
    } else {
      console.log("Company verification email sent:", info.response);
    }
  });
};

const SendForgotPasswordEmail = (email, token) => {
  const mailOptions = {
    from: `"Hirix Support" <${process.env.MAILERUSER}>`,
    to: email,
    subject: "Reset Your Password - Hirix",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Code</title>
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
    .code-box {
      display: inline-block;
      background-color: #f3f4f6;
      border: 2px dashed #00c4a5;
      color: #0b1220;
      font-size: 32px;
      font-weight: 700;
      padding: 15px 40px;
      border-radius: 8px;
      letter-spacing: 5px;
      margin-bottom: 30px;
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
        <h1 style="color: #00c4a5; font-family: sans-serif; margin: 0;">HIRIX</h1>
      </div>
      <div class="content">
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password for your Hirix account. Please use the verification code below to proceed with setting a new password:</p>
        <div class="code-box">${token}</div>
        <p style="font-size: 14px; color: #9ca3af;">This code is valid for 15 minutes. If you did not request a password reset, please ignore this email.</p>
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending password reset email:", error);
    } else {
      console.log("Password reset email sent:", info.response);
    }
  });
};

module.exports = {
  VerifyEmail,
  SendCompanyVerificationEmail,
  SendForgotPasswordEmail,
};
