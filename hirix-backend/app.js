const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const router = require("./routes/app-routes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { databaseconfig } = require("./config/connection");

const { AdminSetup } = require("./controller/admin/adminlogin");
// const cookieParser = require("cookie-parser");

const dotenv = require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

const allowedOrigins = {
  origin: [
    "https://jobs.hirix.pk",
    "https://jobs.hirix.pk/admin",
    "https://jobs.hirix.pk/admin-login",
    "https://jobs.hirix.pk/candidate",
    "https://jobs.hirix.pk/employer",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Optional: Allowed methods
};

app.use(cors(allowedOrigins));
// app.use(cookieParser());

AdminSetup();

databaseconfig();
app.use("/uploads", express.static("uploads"));
app.use(router);

app.listen(port, () => {
  console.log("express app running on port 9000");
});

require("./controller/admin/adminlogin");
require("./controller/admin/adminHaveData");
require("./controller/combined/commonAboutPosts");
require("./controller/admin/activeORfreezeBYadmin");
require("./controller/employee/employeeLogin&Signup");
require("./controller/employee/employeePost");
require("./controller/jobseeker/jobseekerLogin&Signup");
require("./controller/jobseeker/reviews");
require("./controller/employee/regardingApplication");
require("./controller/employee/companies");
require("./controller/employee/reviewApplicants");
require("./controller/employee/messages");

// Generating JWT
// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token

//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 1,
//     }

//     const token = jwt.sign(data, jwtSecretKey);

//     res.send(token);
// });

// Verification of JWT
// app.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in header of request
//     // Due to security reasons.

//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;

//     try {
//         const token = req.header(tokenHeaderKey);

//         const verified = jwt.verify(token, jwtSecretKey);
//         if (verified) {
//             return res.send("Successfully Verified");
//         } else {
//             // Access Denied
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });
