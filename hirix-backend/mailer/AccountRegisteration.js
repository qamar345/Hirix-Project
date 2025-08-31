const nodemailer = require("nodemailer");
require("dotenv").config();

const SendAccountCreatedEmail = (email) => {
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    auth: {
      user: process.env.MAILERUSER,
      pass: process.env.MAILERPASS,
    },
  });

  const mailOptions = {
    from: "Hirix <Hirix Pakistan>",
    to: email,
    subject: "Account Created Successfully",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Hirix!</h2>
        <p>Your account has been <strong>created successfully</strong>.</p>
        <p>You can now log in and start exploring.</p>
        <br/>
        <p style="color: gray; font-size: 12px;">This is an automated message. Please do not reply.</p>
      </div>
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
