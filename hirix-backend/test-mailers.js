const nodemailer = require("nodemailer");
require("dotenv").config();

const primaryTransporter = nodemailer.createTransport({
  host: process.env.MAILHOST || "mail.hirix.com.pk",
  port: parseInt(process.env.MAILPORT || 465),
  secure: parseInt(process.env.MAILPORT || 465) === 465,
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
  auth: {
    user: process.env.MAILERUSER,
    pass: process.env.MAILERPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const secondaryTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  family: 4,
});

const testTargetEmail = process.env.GMAIL_USER;

async function testMailers() {
  console.log("========== TESTING PRIMARY MAILER (mail.hirix.com.pk) ==========");
  try {
    const info = await primaryTransporter.sendMail({
      from: `"Hirix Test Primary" <${process.env.MAILERUSER}>`,
      to: testTargetEmail,
      subject: "Test Primary Email - Hirix",
      html: "<h1 style='color: #126ebb;'>Primary Mailer Works!</h1>",
    });
    console.log("✅ Primary Mailer SUCCESS:", info.response);
  } catch (err) {
    console.error("❌ Primary Mailer FAILED:", err.message || err);
  }

  console.log("\n========== TESTING FALLBACK GMAIL MAILER (Gmail SMTP) ==========");
  try {
    const info = await secondaryTransporter.sendMail({
      from: `"Hirix Test Gmail" <${process.env.GMAIL_USER}>`,
      to: testTargetEmail,
      subject: "Test Gmail Fallback Email - Hirix",
      html: "<h1 style='color: #126ebb;'>Gmail Fallback Mailer Works!</h1>",
    });
    console.log("✅ Fallback Gmail Mailer SUCCESS:", info.response);
  } catch (err) {
    console.error("❌ Fallback Gmail Mailer FAILED:", err.message || err);
  }
}

testMailers();
