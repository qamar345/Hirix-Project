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
    html: `<p>${code}</p>`,
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
