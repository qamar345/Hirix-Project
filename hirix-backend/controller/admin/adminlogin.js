const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { passwordError } = require("../../utils/validatePassword");

const upload = require("../../middleware/upload");

// Admin account creation
//
// Seeds the default admin@hirix.com.pk account the first time this table is
// empty. Previously this hashed a hardcoded "admin123" every boot - if that
// row was ever missing (fresh env, restored backup, accidentally deleted
// row) the well-known default silently came back. Now a random password is
// generated per bootstrap and printed once so it can be captured and
// changed; set ADMIN_BOOTSTRAP_PASSWORD to control it explicitly instead.
const AdminSetup = async () => {
  const createAdminTable = `
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  name VARCHAR(50),
  image VARCHAR(200)
);`;

  const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || crypto.randomBytes(9).toString("base64url");
  const hashedPassword = await bcrypt.hash(bootstrapPassword, 10);

  conn_sql.query(createAdminTable, (err) => {
    if (err) {
      console.error("Failed to create admin table:", err);
      return;
    }
    conn_sql.query(
      "INSERT IGNORE INTO admin (email, password, role, image) VALUES (?, ?, 'admin', ?)",
      [
        "admin@hirix.com.pk",
        hashedPassword,
        "/uploads/1748974785956-slidepic4.png",
      ],
      (err, result) => {
        if (err) {
          console.error("Failed to seed admin user:", err);
          return;
        }
        if (result.affectedRows > 0) {
          console.log("=================================================");
          console.log("Admin account bootstrapped: admin@hirix.com.pk");
          console.log("Bootstrap password:", bootstrapPassword);
          console.log("Log in and change this password immediately.");
          console.log("=================================================");
        } else {
          console.log("Admin user already exists (bootstrap skipped)");
        }
      }
    );
  });
};

//Admin login
const Adminlogin = (req, res) => {
  const { email, password } = req.body;

  const sqladminlogin = "SELECT * FROM `admin` WHERE `email`= ?";
  conn_sql.query(sqladminlogin, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ userStatus: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.json({
        userStatus: false,
        message: "Invalid email or password",
      });
    }

    const admin = result[0];
    const isPasswordValid = bcrypt.compareSync(password, admin.password);

    if (!isPasswordValid) {
      return res.json({
        userStatus: false,
        message: "Invalid email or password",
      });
    }

    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role || "admin" },
      secretKey,
      { expiresIn: "7d" }
    );

    const { password: _pw, ...safeAdmin } = admin;

    return res.json({
      loginStatus: true,
      token,
      admin: safeAdmin,
      message: "Login Successfully!",
    });
  });
};

// Middleware to verify token

// Admin Update Profile
// Only updates the fields actually present in the request - the "Personal
// info" form on the frontend only ever sends the image (name/email aren't
// collected there), so building the query unconditionally with
// `name = ?, email = ?` was wiping both to NULL on every photo-only save.
const AdminProfile = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const { id } = req.params;
  const { name, email } = bodyData;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const updates = [];
  const params = [];
  if (name !== undefined) {
    updates.push("`name` = ?");
    params.push(name);
  }
  if (email !== undefined) {
    updates.push("`email` = ?");
    params.push(email);
  }
  if (imageUrl) {
    updates.push("`image` = ?");
    params.push(imageUrl);
  }

  if (updates.length === 0) {
    return res.json({ message: "Nothing to update" });
  }

  const sqladmin = "UPDATE `admin` SET " + updates.join(", ") + " WHERE id = ?";
  params.push(id);

  conn_sql.query(sqladmin, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update profile" });
    } else {
      return res.json({ message: "Profile updated...", result, imageUrl });
    }
  });
};

// Admin Update Password
const AdminChangePassword = (req, res) => {
  const { id } = req.params;
  const { currentPass, newPass } = req.body.editPasswordData;

  const pwError = passwordError(newPass);
  if (pwError) {
    return res.status(400).json({ msg: pwError });
  }

  const checkPasswordQuery = "SELECT password FROM `admin` WHERE id = ?";

  conn_sql.query(checkPasswordQuery, [id], async (err, results) => {
    if (err) {
      return res.json({ msg: "Database error", err });
    }

    if (results.length === 0) {
      return res.json({ msg: "Admin not found" });
    }

    const storedHashedPassword = results[0].password;

    const isMatch = await bcrypt.compare(currentPass, storedHashedPassword);
    if (!isMatch) {
      return res.json({ msg: "Current password is incorrect" });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPass = await bcrypt.hash(newPass, saltRounds);

    const updatePasswordQuery =
      "UPDATE `admin` SET `password` = ? WHERE id = ?";
    conn_sql.query(
      updatePasswordQuery,
      [hashedNewPass, id],
      (updateErr, updateResult) => {
        if (updateErr) {
          return res.json({ msg: "Failed to update password", updateErr });
        }
        return res.json({ msg: "Password updated successfully", updateResult });
      }
    );
  });
};

const GetAdmin = (req, res) => {
  const { id } = req.params;
  const sql_get =
    "SELECT id, email, role, name, image FROM `admin` WHERE id = ?";
  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      return res.json(result);
    }
  });
};

module.exports = {
  AdminSetup,
  Adminlogin,
  AdminProfile,
  GetAdmin,
  AdminChangePassword,
};
