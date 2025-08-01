const dotenv = require("dotenv").config();
const secretKey = process.env.secretKey;
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  const origin = req.headers["origin"];

  if (origin !== "http://localhost:5173") {
    return res.json("Origin Invalid");
  }

  // console.log(req.headers);
  if (!token) {
    return res.json("Token not provided");
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json("Failed to authenticate token");
      }
      req.adminEmail = decoded.email;
      next();
    });
  }
}

module.exports = verifyToken;
