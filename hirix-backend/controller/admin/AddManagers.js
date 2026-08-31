const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { passwordError } = require("../../utils/validatePassword");

// Add Manager
// Accepts an optional `password` in the body (set by the admin creating the
// account). If omitted, a random one is generated and returned in the
// response so the admin panel can display/share it - the previous version
// of this endpoint had no password field at all, which meant a manager
// could never actually log in.
const AddManager = (req, res) => {
  const { FirstName, email, role, phone, City, province } = req.body;

  if (!FirstName || !email) {
    return res.status(400).json({ msg: "FirstName and email are required" });
  }

  const generatedPassword = req.body.password || crypto.randomBytes(9).toString("base64url");

  bcrypt.hash(generatedPassword, 10, (hashErr, hash) => {
    if (hashErr) {
      console.error(hashErr);
      return res.status(500).json({ msg: "Error hashing password" });
    }

    const sql_addManager =
      "INSERT INTO `admin-account`(`FirstName`, `email`, `password`, `role`, `phone`, `City`, `province`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    conn_sql.query(
      sql_addManager,
      [FirstName, email, hash, role || "manager", phone, City, province],
      (err, result) => {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ msg: "A manager with this email already exists" });
          }
          return res.status(500).json({ msg: "Database error" });
        }
        return res.json({
          msg: "Registered Successfully!",
          result,
          // Only returned when the caller didn't supply their own password -
          // this is the one time it's available in plaintext.
          generatedPassword: req.body.password ? undefined : generatedPassword,
        });
      }
    );
  });
};

// Manager login - mirrors Adminlogin, scoped to the admin-account table.
const ManagerLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required." });
  }

  const sql = "SELECT * FROM `admin-account` WHERE `email` = ?";
  conn_sql.query(sql, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ userStatus: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ userStatus: false, message: "Invalid email or password" });
    }

    const manager = result[0];

    if (manager.status !== "Active") {
      return res.json({ userStatus: false, message: "Your account is inactive. Please contact an administrator." });
    }

    bcrypt.compare(password, manager.password, (compareErr, isMatch) => {
      if (compareErr) {
        console.error(compareErr);
        return res.status(500).json({ message: "Error comparing passwords" });
      }
      if (!isMatch) {
        return res.json({ userStatus: false, message: "Invalid email or password" });
      }

      const secretKey = process.env.SECRETKEY;
      const token = jwt.sign(
        { id: manager.id, email: manager.email, role: manager.role },
        secretKey,
        { expiresIn: "7d" }
      );

      const { password: _pw, ...safeManager } = manager;

      return res.json({
        loginStatus: true,
        token,
        manager: safeManager,
        message: "Login Successfully!",
      });
    });
  });
};

// Get a manager's own profile - the Settings page needs somewhere to fetch
// from that isn't the `admin` table (a manager's id belongs to admin-account,
// a different id-space entirely).
const GetManagerById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT `id`, `FirstName`, `email`, `role`, `phone`, `City`, `province`, `status`, `image` FROM `admin-account` WHERE id = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    return res.json(result);
  });
};

// Update a manager's own profile photo (mirrors AdminProfile - only updates
// fields actually present in the request so an image-only save can't wipe
// out other columns).
const UpdateManagerProfile = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const { id } = req.params;
  const { FirstName, email, phone, City, province } = bodyData;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const updates = [];
  const params = [];
  if (FirstName !== undefined) { updates.push("`FirstName` = ?"); params.push(FirstName); }
  if (email !== undefined) { updates.push("`email` = ?"); params.push(email); }
  if (phone !== undefined) { updates.push("`phone` = ?"); params.push(phone); }
  if (City !== undefined) { updates.push("`City` = ?"); params.push(City); }
  if (province !== undefined) { updates.push("`province` = ?"); params.push(province); }
  if (imageUrl) { updates.push("`image` = ?"); params.push(imageUrl); }

  if (updates.length === 0) {
    return res.json({ message: "Nothing to update" });
  }

  const sql = "UPDATE `admin-account` SET " + updates.join(", ") + " WHERE id = ?";
  params.push(id);

  conn_sql.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "A manager with this email already exists" });
      }
      return res.status(500).json({ message: "Failed to update profile" });
    }
    return res.json({ message: "Profile updated...", result, imageUrl });
  });
};

// Change a manager's own password (mirrors AdminChangePassword, scoped to
// admin-account).
const ManagerChangePassword = (req, res) => {
  const { id } = req.params;
  const { currentPass, newPass } = req.body.editPasswordData || {};

  const pwError = passwordError(newPass);
  if (pwError) {
    return res.status(400).json({ msg: pwError });
  }

  conn_sql.query("SELECT password FROM `admin-account` WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ msg: "Manager not found" });
    }

    bcrypt.compare(currentPass, results[0].password, (compareErr, isMatch) => {
      if (compareErr) {
        console.error(compareErr);
        return res.status(500).json({ msg: "Error comparing passwords" });
      }
      if (!isMatch) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }

      bcrypt.hash(newPass, 10, (hashErr, hashedNewPass) => {
        if (hashErr) {
          console.error(hashErr);
          return res.status(500).json({ msg: "Error hashing new password" });
        }
        conn_sql.query(
          "UPDATE `admin-account` SET `password` = ? WHERE id = ?",
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

module.exports = { AddManager, ManagerLogin, GetManagerById, UpdateManagerProfile, ManagerChangePassword };
