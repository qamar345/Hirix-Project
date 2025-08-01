const nodemailer = require("nodemailer");
require("dotenv").config();

const VerifyEmail = (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: "nimraasad09@gmail.com", // Your email
      pass: process.env.MAILERPASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Hirix <nimraasad09@gmail.com>",
    to: email,
    subject: "Verification",
    html: `
    <p style="font-size: 16px;">🔐 <strong>Your Verification Code:</strong></p>
  <p style="font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #333;">${code}</p>

  <p style="font-size: 14px; color: #555;">
    Please use this code to verify your email address. The code will expire shortly.
  </p>

  <br/>

  <p style="color: gray; font-size: 12px;">This is an automated message. Please do not reply.</p>`,
  }

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
