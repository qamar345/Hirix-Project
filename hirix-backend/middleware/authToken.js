const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) return res.redirect("/");

  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json("Failed to authenticate token");
      }

      req.userEmail = decoded.email;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Token not provided" });
  }
}

module.exports = verifyToken;
