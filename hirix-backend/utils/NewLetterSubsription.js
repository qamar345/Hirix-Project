const { conn_sql } = require("../config/connection");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

const Subscribe = (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ msg: "Please enter email first!!!" });
  const sql = "INSERT INTO `news_letters`(`email`) VALUES (?)";
  conn_sql.query(sql, [email], (err, result) => {
    console.log(err);
    if (err) return res.json({ msg: "Something went wrong!!!" });
    return res.json({ msg: "Subscribed Successfuly" });
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILERUSER,
    pass: process.env.MAILERPASS,
  },
});

async function sendNewsletter() {
  console.log("⏰ Checking for new jobs...");

  // 1. Get jobs from last 6 hours
  conn_sql.query(
    "SELECT * FROM jobs WHERE created_at >= NOW() - INTERVAL 6 HOUR",
    (err, jobs) => {
      if (err) {
        console.error("❌ Error fetching jobs:", err);
        return;
      }

      if (jobs.length === 0) {
        console.log("⚠️ No new jobs in last 6 hours.");
        return;
      }

      // 2. Get subscribers
      conn_sql.query(
        "SELECT email FROM news_letters",
        async (err, subscribers) => {
          if (err) {
            console.error("❌ Error fetching subscribers:", err);
            return;
          }

          if (subscribers.length === 0) {
            console.log("⚠️ No subscribers found.");
            return;
          }

          // 3. Build email content
          const jobHTML = jobs
            .map(
              (job) => `
          <div style="padding:10px 0;border-bottom:1px solid #ddd;">
            <h3 style="margin:0;color:#126ebb;">${job.title}</h3>
            <p style="margin:4px 0;">📍 ${job.location} | 💼 ${job.type}</p>
            <p style="margin:4px 0;color:#555;">${job.description}</p>
          </div>
        `
            )
            .join("");

          const htmlContent = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <div style="background:#126ebb;padding:20px;text-align:center;">
            <img src="https://yourdomain.com/hirixTextLogo.png" alt="Hirix Logo" style="max-width:180px;">
          </div>
          <div style="padding:20px;">
            <h2 style="color:#126ebb;">🚀 Jobs Posted in the Last 6 Hours</h2>
            ${jobHTML}
            <div style="margin-top:20px;text-align:center;">
              <a href="https://yourdomain.com/jobs" 
                 style="background:#126ebb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">
                View All Jobs
              </a>
            </div>
          </div>
          <div style="background:#f1f1f1;padding:15px;text-align:center;color:#888;font-size:12px;">
            You are receiving this email because you subscribed to Hirix job alerts.<br>
            © 2025 Hirix. All rights reserved.
          </div>
        </div>
        `;

          // 4. Send emails to all subscribers
          for (let sub of subscribers) {
            try {
              await transporter.sendMail({
                from: '"Hirix Jobs" <qamargill427@gmail.com>',
                to: sub.email,
                subject: "🚀 New Jobs Posted in Last 6 Hours",
                html: htmlContent,
              });
            } catch (e) {
              console.error(`❌ Failed to send to ${sub.email}:`, e.message);
            }
          }

          console.log(
            `✅ Newsletter sent to ${subscribers.length} subscribers!`
          );
        }
      );
    }
  );
}

// ✅ Schedule cron job (every 6 hours)
// cron.schedule("0 */6 * * *", sendNewsletter);
setTimeout(sendNewsletter, 5000);

module.exports = {
  Subscribe,
};
