const { conn_sql } = require("../../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const upload = require("../../middleware/upload");

// Admin account creation

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

  const hashedPassword = await bcrypt.hash("admin123", 10);
  conn_sql.query(createAdminTable, (err) => {
    if (err) throw err;
    conn_sql.query(
      "INSERT IGNORE INTO admin (email, password, role, image) VALUES (?, ?, 'admin', ?)",
      [
        "admin@hirix.com.pk",
        hashedPassword,
        "/uploads/1748974785956-slidepic4.png",
      ],
      (err) => {
        if (err) throw err;
        console.log("Admin user created (if not exists)");
      }
    );
  });
};

//Admin login
const Adminlogin = (req, res) => {
  const { email, password } = req.body;

  const sqladminlogin = "SELECT * FROM `admin` WHERE `email`= ?";
  conn_sql.query(sqladminlogin, [email], (err, result) => {
    if (err) throw err;

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
const AdminProfile = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const { id } = req.params;
  const { name, email } = bodyData;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  let sqladmin = "UPDATE `admin` SET `name` = ?, `email` = ?";
  const params = [name, email];
  if (imageUrl) {
    sqladmin += ", `image` = ?";
    params.push(imageUrl);
  }
  sqladmin += " WHERE id = ?";
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
