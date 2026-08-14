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

// Dynamic CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://jobs.hirix.com.pk",
    "https://www.hirix.com.pk",
    "https://hirix.com.pk",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"

  ];
  const origin = req.headers.origin;

  // Only echo back the Origin header when it's on the allowlist - never
  // fall back to "*", which combined with credentialed requests would let
  // any website read authenticated responses from this API.
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  // Allowed methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  // Allowed headers (must include x-access-token for auth token verification)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, x-access-token"
  );

  // Baseline security headers (in lieu of a helmet dependency)
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// const allowedOrigins = {
//   origin: [
//     "https://jobs.hirix.pk",
//     "https://jobs.hirix.pk/admin",
//     "https://jobs.hirix.pk/admin-login",
//     "https://jobs.hirix.pk/candidate",
//     "https://jobs.hirix.pk/employer",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"], // Optional: Allowed methods
// };

// app.use(cors());
// app.use(cookieParser());

AdminSetup();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerSpec");

const { migrateSchema } = require("./migrate-db");

databaseconfig();
migrateSchema().catch(err => {
  console.error("Auto-migration on startup failed:", err);
});
app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);

// Centralized error handler - catches multer errors (bad file type, too
// large) and anything else passed to next(err), and makes sure the client
// always gets a clean JSON response instead of a raw stack trace or a
// hung request.
app.use((err, req, res, next) => {
  if (err && err.name === "MulterError") {
    return res.status(400).json({ success: false, msg: err.message });
  }
  if (err) {
    console.error(err);
    return res.status(err.status || 500).json({ success: false, msg: err.message || "Internal server error" });
  }
  next();
});

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
