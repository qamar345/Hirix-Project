const { conn_sql } = require("../../config/connection");

// GET /site-settings
const GetSiteSettings = (req, res) => {
  const sql = "SELECT * FROM `site_configs`";
  conn_sql.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Format array of key-value pairs into a clean single object
    const settingsObject = {};
    results.forEach((row) => {
      settingsObject[row.config_key] = row.config_value;
    });

    return res.json(settingsObject);
  });
};

// PUT /site-settings (Admin-only update)
const UpdateSiteSettings = (req, res) => {
  const { settings } = req.body; // Expects an object: { site_email: "...", site_phone: "..." }
  
  if (!settings || typeof settings !== "object") {
    return res.status(400).json({ msg: "Invalid settings format. Expected an object." });
  }

  const keys = Object.keys(settings);
  if (keys.length === 0) {
    return res.json({ msg: "No configuration values provided for update." });
  }

  // Chain promises or execute queries sequentially
  let completed = 0;
  let hasError = false;

  keys.forEach((key) => {
    const value = settings[key] !== undefined && settings[key] !== null ? settings[key].toString() : "";
    const sql = "INSERT INTO `site_configs` (`config_key`, `config_value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `config_value` = ?";
    
    conn_sql.query(sql, [key, value, value], (err) => {
      if (err) {
        console.error(`Error updating site config ${key}:`, err);
        hasError = true;
      }
      completed++;
      if (completed === keys.length) {
        if (hasError) {
          return res.status(500).json({ msg: "Some configurations failed to update." });
        }
        return res.json({ msg: "Site configurations updated successfully!" });
      }
    });
  });
};

module.exports = { GetSiteSettings, UpdateSiteSettings };
