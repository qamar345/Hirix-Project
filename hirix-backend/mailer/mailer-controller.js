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
    subject: "Verification",
    html: `
    <p style="font-size: 16px;">🔐 <strong>Your Verification Link:</strong></p>
  <p style="font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #333;">
 <a href='${link}' target="_blank">Click to Verify</a> 
  </p>

  <p style="font-size: 14px; color: #555;">
    Please use this code to verify your email address. The code will expire shortly.
  </p>

  <br/>

  <p style="color: gray; font-size: 12px;">This is an automated message. Please do not reply.</p>`,
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
