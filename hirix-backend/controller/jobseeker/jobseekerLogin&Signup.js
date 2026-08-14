const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//job seeker login (works for both jobseeker and employee via single form)
const userlogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required." });
  }

  const sqluserlogin = "SELECT * FROM `user_accounts` WHERE `email` = ?";
  conn_sql.query(sqluserlogin, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.json({ msg: "User not exist!!!" });
    }

    const user = result[0];

    // Check if account is frozen
    if (user.account_status === 0) {
      return res.json({ msg: "Your account is frozen. Please contact support." });
    }

    bcrypt.compare(password, user.password, function (compareErr, isMatch) {
      if (compareErr) {
        return res.status(500).json({ msg: "Error comparing passwords." });
      }
      if (isMatch) {
        const secretKey = process.env.SECRETKEY;
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          secretKey,
          { expiresIn: "7d" }
        );

        const { password: _pw, ...safeUser } = user;

        return res.json({
          isloggedin: true,
          msg: "Login Successfully!",
          data: safeUser,
          token,
        });
      } else {
        return res.json({ isloggedin: false, msg: "Invalid email or password." });
      }
    });
  });
};

// Job seeker Update Profile
// Note: email/password are intentionally NOT editable here. Email changes
// must go through the verified-email flow, and password changes must go
// through JobSeekerChangePassword (which requires the current password and
// hashes the new one). Accepting them here previously allowed an
// authenticated user to silently take over any account by ID.
const UserProfile = (req, res) => {
  const { id } = req.params;
  const { username, image, phone, qualification, location } = req.body;
  const sqladmin =
    "UPDATE `user_accounts` SET `username`= ?,`image`= ?, `phone`= ?, `qualification`=? , `location`=? WHERE id=?";
  conn_sql.query(
    sqladmin,
    [username, image, phone, qualification, location, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Your Profile is Updated now.", result });
      }
    }
  );
};

// job_seeker see job post on the basis of their skillset
const showjobs = (req, res) => {
  const { id } = req.params; // jobseeker_id

  // First query: get the skillset ids of the jobseeker
  const sql = `
    SELECT skillset.id 
    FROM skillset 
    JOIN jobseeker_skills ON jobseeker_skills.skillset_id = skillset.id 
    WHERE jobseeker_skills.job_seeker_id = ?
  `;
  conn_sql.query(sql, [id], (err, skillResult) => {
    if (err) return res.status(500).json(err);

    if (skillResult.length > 0) {
      // Collect all the skillset ids of the jobseeker
      const skillIds = skillResult.map((skill) => skill.id);

      // Second query: find jobs that require those skills
      const query = `
        SELECT DISTINCT job_required_skills.job_id
        FROM job_required_skills
        WHERE job_required_skills.skillset_id IN (?)
      `;
      conn_sql.query(query, [skillIds], (err, jobResult) => {
        if (err) return res.status(500).json(err);

        if (jobResult.length > 0) {
          const jobIds = jobResult.map((job) => job.job_id);

          // Third query: get the job details for those jobs
          const querySolve = `
            SELECT * 
            FROM jobs 
            WHERE id IN (?)
          `;
          conn_sql.query(querySolve, [jobIds], (err, finalResult) => {
            if (err) return res.status(500).json(err);

            return res.json(finalResult);
          });
        } else {
          return res.json([]); // No jobs found
        }
      });
    } else {
      return res.json([]); // No skills found for this job seeker
    }
  });
};

// Password Change
const JobSeekerChangePassword = (req, res) => {
  const { id } = req.params;
  const { currentPass, newPass } = req.body.editPasswordData;
  const checkPasswordQuery =
    "SELECT password FROM `user_accounts` WHERE id = ?";

  conn_sql.query(checkPasswordQuery, [id], (err, results) => {
    if (err) {
      return res.json({ msg: "Database error", err });
    }

    if (results.length === 0) {
      return res.json({ msg: "user not found" });
    }

    const storedPassword = results[0].password;

    bcrypt.compare(currentPass, storedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        return res.status(500).json({ msg: "Error comparing passwords" });
      }
      if (!isMatch) {
        return res.json({ msg: "Current password is incorrect" });
      }

      bcrypt.hash(newPass, 10, (hashErr, hashedNewPass) => {
        if (hashErr) {
          return res.status(500).json({ msg: "Error hashing new password" });
        }

        const updatePasswordQuery =
          "UPDATE `user_accounts` SET `password`= ? WHERE id=?";
        conn_sql.query(
          updatePasswordQuery,
          [hashedNewPass, id],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error(updateErr);
              return res.status(500).json({ msg: "Failed to update password" });
            }
            return res.json({ msg: "Password updated successfully", updateResult });
          }
        );
      });
    });
  });
};

module.exports = { userlogin, UserProfile, showjobs, JobSeekerChangePassword };
