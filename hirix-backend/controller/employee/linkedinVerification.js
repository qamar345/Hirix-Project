const { conn_sql } = require("../../config/connection");
const axios = require("axios");

// Initiate LinkedIn OAuth Flow for Company Verification
const getLinkedInAuthURL = (req, res) => {
  const { company_id } = req.query;
  if (!company_id) {
    return res.status(400).json({ error: "company_id query param is required" });
  }

  const clientID = process.env.LINKEDIN_CLIENT_ID || "mock_id";
  const redirectURI = encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI);
  
  // Save company_id in state variable so we know which company to verify on callback
  const state = encodeURIComponent(JSON.stringify({
    companyId: company_id,
    secret: process.env.LINKEDIN_STATE_SECRET || "state_secret"
  }));

  const scope = "r_liteprofile r_emailaddress w_member_social"; // Standard scopes (use organizations lookup scope if approved by LinkedIn)
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`;

  return res.json({ url: authUrl });
};

// Handle LinkedIn Callback
const handleLinkedInCallback = async (req, res) => {
  const { code, state, error, error_description } = req.query;

  if (error) {
    return res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
          <h2 style="color: red;">LinkedIn Verification Failed</h2>
          <p>${error_description}</p>
          <button onclick="window.close()">Close Window</button>
        </body>
      </html>
    `);
  }

  try {
    const stateData = JSON.parse(decodeURIComponent(state));
    const companyId = stateData.companyId;

    // Exchange auth code for access token
    const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
    const payload = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET
    });

    const tokenResponse = await axios.post(tokenUrl, payload.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const accessToken = tokenResponse.data.access_token;

    // Verify User via LinkedIn Profile API
    // Fetch profile details as verification proof
    const profileUrl = "https://api.linkedin.com/v2/me";
    const profileResponse = await axios.get(profileUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const linkedinUserId = profileResponse.data.id;
    const profileName = `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`;

    // Update company verification status in database
    const updateSql = `
      UPDATE companies 
      SET is_linkedin_verified = 1, 
          linkedin_company_id = ?, 
          linkedin_verified_at = NOW() 
      WHERE id = ?
    `;

    conn_sql.query(updateSql, [linkedinUserId, companyId], (dbErr, result) => {
      if (dbErr) {
        console.error("DB Update error:", dbErr);
        return res.status(500).send("Database error during verification update.");
      }

      // Return success HTML template that automatically closes popups
      return res.send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f3f6f8;">
            <div style="background: white; display: inline-block; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <div style="color: #0077b5; font-size: 50px; margin-bottom: 20px;">✔</div>
              <h2 style="color: #333; margin-bottom: 10px;">Verification Successful!</h2>
              <p style="color: #666; margin-bottom: 20px;">Company has been verified with LinkedIn Profile: <strong>${profileName}</strong></p>
              <p style="color: #999; font-size: 13px;">This window will close automatically.</p>
              <button onclick="window.close()" style="background-color: #0077b5; color: white; border: none; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer;">Done</button>
            </div>
            <script>
              setTimeout(() => {
                if (window.opener) {
                  window.opener.postMessage({ type: "LINKEDIN_VERIFICATION_SUCCESS", companyId: "${companyId}" }, "*");
                }
                window.close();
              }, 3000);
            </script>
          </body>
        </html>
      `);
    });
  } catch (err) {
    console.error("LinkedIn verification callback failed:", err.message);
    return res.status(500).send("Verification request failed. Please check credentials.");
  }
};

module.exports = {
  getLinkedInAuthURL,
  handleLinkedInCallback
};
