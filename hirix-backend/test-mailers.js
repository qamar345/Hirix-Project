// Diagnostic script: exercises the real mailer chain (primary:465 -> primary:587 -> Gmail fallback)
// so a passing run here reflects exactly what production would do.
require("dotenv").config();
const { VerifyEmail } = require("./mailer/mailer-controller");

const testTargetEmail = process.env.GMAIL_USER || process.env.MAILERUSER;

async function main() {
  console.log("========== TESTING FULL MAILER FALLBACK CHAIN ==========");
  console.log("Sending test verification email to:", testTargetEmail);
  try {
    const info = await VerifyEmail(testTargetEmail, "test-token-diagnostic");
    console.log("✅ Mail sent successfully:", info.response);
  } catch (err) {
    console.error("❌ All transporters failed:", err.message || err);
    process.exitCode = 1;
  }
}

main();
