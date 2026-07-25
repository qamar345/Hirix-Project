const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ success: false, msg: "Access Denied: Token not provided" });
  }

  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ success: false, msg: "Failed to authenticate token" });
      }

      req.userEmail = decoded.email;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error in Auth Middleware" });
  }
}

module.exports = verifyToken;
