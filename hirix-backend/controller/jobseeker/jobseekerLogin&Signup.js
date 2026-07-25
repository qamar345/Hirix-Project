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
          { expiresIn: "20m" }
        );

        return res.json({
          isloggedin: true,
          msg: "Login Successfully!",
          data: user,
          token,
        });
      } else {
        return res.json({ isloggedin: false, msg: "Invalid email or password." });
      }
    });
  });
};

// Job seeker Update Profile
const UserProfile = (req, res) => {
  const { id } = req.params;
  const { username, image, email, password, phone, qualification, location } =
    req.body;
  const sqladmin =
    "UPDATE `user_accounts` SET `username`= ?,`image`= ?, `email`= ? , `password`= ?, `phone`= ?, `qualification`=? , `location`=? WHERE id=?";
  conn_sql.query(
    sqladmin,
    [username, image, email, password, phone, qualification, location, id],
    (err, result) => {
      if (err) {
        return res.json(err);
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

    if (storedPassword !== currentPass) {
      return res.json({ msg: "Current password is incorrect" });
    }
    const updatePasswordQuery =
      "UPDATE `user_accounts` SET `password`= ? WHERE id=?";
    conn_sql.query(
      updatePasswordQuery,
      [newPass, id],
      (updateErr, updateResult) => {
        if (updateErr) {
          return res.json({ msg: "Failed to update password", updateErr });
        }
        return res.json({ msg: "Password updated successfully", updateResult });
      }
    );
  });
};

module.exports = { userlogin, UserProfile, showjobs, JobSeekerChangePassword };
