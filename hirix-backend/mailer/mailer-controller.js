const nodemailer = require("nodemailer");
require("dotenv").config();

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const mailHost = process.env.MAILHOST || "mail.hirix.com.pk";
const mailPort = parseInt(process.env.MAILPORT || 465);

// A short 4s timeout was tripping false failures on slightly slower
// production network paths - give the SMTP handshake more room.
const SMTP_TIMEOUT = 12000;

// Primary Transporter (noreply@hirix.com.pk) on its configured port (465/SSL by default)
const primaryTransporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: mailPort === 465,
  connectionTimeout: SMTP_TIMEOUT,
  greetingTimeout: SMTP_TIMEOUT,
  socketTimeout: SMTP_TIMEOUT,
  auth: {
    user: process.env.MAILERUSER,
    pass: process.env.MAILERPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Some hosts block outbound 465 (implicit TLS) but allow 587 (STARTTLS).
// Only add this as a distinct attempt when it isn't already what we tried above.
const primaryAltTransporter = mailPort !== 587 ? nodemailer.createTransport({
  host: mailHost,
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: SMTP_TIMEOUT,
  greetingTimeout: SMTP_TIMEOUT,
  socketTimeout: SMTP_TIMEOUT,
  auth: {
    user: process.env.MAILERUSER,
    pass: process.env.MAILERPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
}) : null;

// Secondary / Fallback Transporter (Gmail)
const secondaryTransporter = process.env.GMAIL_USER && process.env.GMAIL_PASS ? nodemailer.createTransport({
  service: "gmail",
  connectionTimeout: SMTP_TIMEOUT,
  greetingTimeout: SMTP_TIMEOUT,
  socketTimeout: SMTP_TIMEOUT,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
}) : null;

// Ordered chain of transporters to try. Each entry rewrites the "from"
// header to match the account it actually sends through.
const transporterChain = [
  { label: "primary (mail.hirix.com.pk:" + mailPort + ")", transporter: primaryTransporter, rewriteFrom: null },
  ...(primaryAltTransporter ? [{ label: "primary-alt (mail.hirix.com.pk:587)", transporter: primaryAltTransporter, rewriteFrom: null }] : []),
  ...(secondaryTransporter ? [{ label: "Gmail fallback", transporter: secondaryTransporter, rewriteFrom: `"Hirix" <${process.env.GMAIL_USER}>` }] : []),
];

// Helper to send mail, walking the transporter chain until one succeeds.
const sendMailWithFallback = async (mailOptions) => {
  let lastError;
  for (const { label, transporter, rewriteFrom } of transporterChain) {
    const options = rewriteFrom ? { ...mailOptions, from: rewriteFrom } : mailOptions;
    try {
      const info = await transporter.sendMail(options);
      console.log(`Email sent successfully via ${label}:`, info.response);
      return info;
    } catch (error) {
      lastError = error;
      console.warn(`Mailer [${label}] failed:`, error.message || error);
    }
  }
  console.error("All mail transporters failed for:", mailOptions.to);
  throw lastError;
};

const VerifyEmail = (email, token) => {
  const isLocal = process.env.NODE_ENV !== "production" && (!process.env.URL || process.env.URL.includes("localhost"));
  const link = isLocal
    ? `http://localhost:9000/verify-mail-link/${token}`
    : `https://api.hirix.com.pk/verify-mail-link/${token}`;

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
      color: #126ebb;
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
      background-color: #126ebb;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(18, 110, 187, 0.25);
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
        <h1 style="color: #126ebb; font-family: sans-serif;">HIRIX</h1>
      </div>
      <div class="content">
        <h2>Verify Your Email Address</h2>
        <p>Thank you for signing up on the Hirix Job Portal. Please verify your email address by clicking the button below to activate your account.</p>
        <a href="${link}" class="btn" target="_blank">Verify Email Address</a>
        <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">If the button above doesn't work, copy and paste this link into your browser:<br><a href="${link}" style="color: #126ebb; word-break: break-all;">${link}</a></p>
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

  // Send the email - return the promise so the caller can tell whether it
  // actually went out instead of always reporting success to the user.
  return sendMailWithFallback(mailOptions);
};

const SendCompanyVerificationEmail = (email, token, companyName) => {
  const isLocal = process.env.NODE_ENV !== "production" && (!process.env.URL || process.env.URL.includes("localhost"));
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
      background-color: #126ebb;
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
      background-color: #126ebb;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(18, 110, 187, 0.25);
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
        <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">If the button above doesn't work, copy and paste this link into your browser:<br><a href="${link}" style="color: #126ebb; word-break: break-all;">${link}</a></p>
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

  return sendMailWithFallback(mailOptions);
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
      color: #126ebb;
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
      border: 2px dashed #126ebb;
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
        <h1 style="color: #126ebb; font-family: sans-serif; margin: 0;">HIRIX</h1>
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

  return sendMailWithFallback(mailOptions);
};

const SendContactFormEmail = (name, email, subject, message) => {
  const mailOptions = {
    from: `"Hirix Contact Form" <${process.env.MAILERUSER}>`,
    to: "support@hirix.com.pk",
    replyTo: email,
    subject: `New Contact Query: ${subject} (from ${name})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Query</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
    <h2 style="color: #126ebb; border-bottom: 2px solid #126ebb; padding-bottom: 10px; margin-top: 0;">New Contact Query Received</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #126ebb;">${escapeHtml(email)}</a></p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #126ebb; border-radius: 4px;">
      <p style="margin: 0; white-space: pre-wrap; color: #334155; line-height: 1.6;">${escapeHtml(message)}</p>
    </div>
    <hr style="margin-top: 30px; border: none; border-top: 1px solid #eeeeee;" />
    <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">This query was sent via the contact form on Hirix Pakistan.</p>
  </div>
</body>
</html>
    `,
  };

  return sendMailWithFallback(mailOptions);
};

module.exports = {
  VerifyEmail,
  SendCompanyVerificationEmail,
  SendForgotPasswordEmail,
  SendContactFormEmail,
};
