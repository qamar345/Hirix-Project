const { conn_sql } = require("../../config/connection");
const { VerifyEmail, SendForgotPasswordEmail, SendContactFormEmail } = require("../../mailer/mailer-controller");
const bcrypt = require("bcryptjs");

// get All job posts
const GetpostsByAdmin = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = 10;
  const offset = (page - 1) * limit;
  const sql_get =
    "SELECT jobs.*, (SELECT COUNT(*) FROM applicants WHERE applicants.job_id = jobs.id) AS applicant_count FROM jobs WHERE title LIKE ? LIMIT ? OFFSET ?";

  conn_sql.query(sql_get, [`%${search}%`, limit, offset], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      const sql = "  SELECT COUNT(*) as count FROM jobs WHERE title LIKE ?";

      conn_sql.query(sql, [`%${search}%`], (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: result,
          meta: {
            search,
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }
  });
};
const Getposts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const city = req.query.city || "";
  const category = req.query.category || "";
  const limit = 10;
  const offset = (page - 1) * limit;
  const jobTypes = req.query.jobTypes || "";
  const salaryMin = req.query.salaryMin ? parseInt(req.query.salaryMin) : null;
  const salaryMax = req.query.salaryMax ? parseInt(req.query.salaryMax) : null;
  const rate = req.query.rate || null;
  const experiences = req.query.experiences || "";
  const careerLevels = req.query.careerLevels || "";
  let filters = [`jobs.status = "Open"`];
  let values = [];

  if (search) {
    filters.push(`jobs.title LIKE ?`);
    values.push(`%${search}%`);
  }

  if (city) {
    filters.push(`jobs.city LIKE ?`);
    values.push(`%${city}%`);
  }

  if (category) {
    filters.push(`jobs.required_skills LIKE ?`);
    values.push(`%${category}%`);
  }

  if (jobTypes) {
    filters.push(`jobs.job_type = ?`);
    values.push(jobTypes);
  }

  if (salaryMin !== null) {
    filters.push(`jobs.minimum_currency >= ?`);
    values.push(salaryMin);
  }

  if (salaryMax !== null) {
    filters.push(`jobs.minimum_currency <= ?`);
    values.push(salaryMax);
  }

  if (rate) {
    filters.push(`jobs.Rate = ?`);
    values.push(rate);
  }

  if (experiences) {
    filters.push(`jobs.Experience = ?`);
    values.push(experiences);
  }

  if (careerLevels) {
    filters.push(`jobs.career_level = ?`);
    values.push(careerLevels);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  console.log(whereClause)

  const sql_getJobs = `
    SELECT 
      jobs.*, 
      (SELECT COUNT(*) FROM applicants WHERE applicants.job_id = jobs.id) AS applicant_count,
      user_accounts.username AS employer_username,
      companies.images,
      companies.name AS company_name
    FROM jobs
    LEFT JOIN user_accounts ON jobs.employee_id = user_accounts.id
    LEFT JOIN companies ON jobs.company_name = companies.id
    ${whereClause}
    LIMIT ? OFFSET ?
  `;
  values.push(limit, offset);

  conn_sql.query(sql_getJobs, values, (err, jobsResult) => {
    if (err) return res.json(err);

    conn_sql.query(`SELECT * FROM companies`, (compErr, companyResult) => {
      if (compErr) return res.json(compErr);

      const sql_count = `
        SELECT COUNT(*) as count FROM jobs
        LEFT JOIN user_accounts ON jobs.employee_id = user_accounts.id
        LEFT JOIN companies ON jobs.company_name = companies.id
        ${whereClause}
      `;
      conn_sql.query(sql_count, values.slice(0, -2), (countErr, countData) => {
        if (countErr) return res.json(countErr);

        const totalData = countData[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: {
            jobs: jobsResult,
            company: companyResult,
          },
          meta: {
            search,
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    });
  });
};

// getPosts by id
const Getpostbyid = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      jobs.*, 
      companies.name AS company_name, 
      companies.About AS company_description,
      companies.images AS company_logo
    FROM jobs 
    LEFT JOIN companies ON jobs.company_name = companies.id
    WHERE jobs.id = ?
  `;

  conn_sql.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(404).json({ msg: "Job not found" });

    res.json(results[0]); // return a single job object with company details
  });
};

// get all jobs of applicant where he/she  applied to

const GetSpecificPost = (req, res) => {
  const { id } = req.params;

  // SQL query to fetch all job IDs for a given client (client_id) from the applicants table
  const sql_get_applications = `
    SELECT job_id 
    FROM applicants
    WHERE job_seeker_id = ?
  `;

  conn_sql.query(sql_get_applications, [id], (err, applicationsResult) => {
    if (err) {
      return res.json({ error: err.message });
    } else {
      // If the client has applied for any job
      if (applicationsResult.length > 0) {
        const jobIds = applicationsResult.map(
          (application) => application.job_id
        ); // Collect job_ids of the jobs the client has applied to

        // Now fetch details of those jobs from the jobs table
        const sql_get_jobs = `
          SELECT * FROM jobs
          WHERE id IN (?);
        `;

        conn_sql.query(sql_get_jobs, [jobIds], (err, jobPostsResult) => {
          if (err) {
            return res.json({ error: err.message });
          } else {
            // If there are jobs that the client has applied for
            if (jobPostsResult.length > 0) {
              return res.json({
                message: "Job posts fetched successfully",
                jobPosts: jobPostsResult,
              });
            } else {
              return res.json({
                message: "No job posts found for this client",
              });
            }
          }
        });
      } else {
        return res.json({
          message: "This client has not applied for any jobs",
        });
      }
    }
  });
};

//put filters
const filtersCount = async (req, res) => {
  const jobTypes = ["full", "intern", "part"];
  const careerLevels = ["starting", "junior", "middle", "senior"];
  const experiences = [
    { label: "1 - 2 Years", value: 2 },
    { label: "3 - 5 Years", value: 5 },
    { label: "6 - 9 Years", value: 9 },
    { label: "10+ Years", value: 10 },
  ];

  const getCounts = (items, queryFn) => {
    return Promise.all(
      items.map((item) => {
        return new Promise((resolve, reject) => {
          const { sql, values } = queryFn(item);
          conn_sql.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve({ ...item, count: result[0].count });
          });
        });
      })
    );
  };

  try {
    const jobTypeCounts = await getCounts(
      jobTypes.map((j) => ({ value: j })),
      (item) => ({
        sql: "SELECT COUNT(*) as count FROM jobs WHERE job_type = ? AND status = 'Open'",
        values: [item.value],
      })
    );

    const careerLevelCounts = await getCounts(
      careerLevels.map((c) => ({ value: c })),
      (item) => ({
        sql: "SELECT COUNT(*) as count FROM jobs WHERE career_level = ? AND status = 'Open'",
        values: [item.value],
      })
    );

    const experienceCounts = await getCounts(experiences, (item) => ({
      sql: "SELECT COUNT(*) as count FROM jobs WHERE experience = ? AND status = 'Open'",
      values: [item.value],
    }));

    return res.json({
      jobTypes: jobTypeCounts,
      careerLevels: careerLevelCounts,
      experiences: experienceCounts,
    });
  } catch (error) {
    console.error("Filter Count Error:", error);
    return res.status(500).json({ error: "Failed to fetch filter counts" });
  }
};

// get reviews
const Getreviews = (req, res) => {
  const sql_get = "SELECT * FROM `reviews`";
  conn_sql.query(sql_get, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

//VerifyEmail
const SendCode = (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(400).json({ msg: "Enter your email address" });
  }
  const sql_verify = "SELECT email FROM `user_accounts` WHERE email = ?";
  conn_sql.query(sql_verify, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", err });
    if (result.length === 0) {
      return res.status(404).json({ message: "Invalid Email" });
    } else {
      const Token = Math.floor(1000 + Math.random() * 9000);
      const sql_store_token =
        "INSERT INTO `verifyemail` (`email`,`token`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `token` = ?";
      conn_sql.query(sql_store_token, [email, Token, Token], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database token storage error", err });
        } else {
          SendForgotPasswordEmail(email, Token);
          return res.json({ msg: "Verification token sent successfully!", result });
        }
      });
    }
  });
};

//VerifyEmail (For admin)
const SendCodeForAdmin = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Enter your email address" });
  }
  const sql_verify = "SELECT email FROM `admin` WHERE email = ?";
  conn_sql.query(sql_verify, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", err });
    if (result.length === 0) {
      return res.status(404).json({ message: "Invalid Email" });
    } else {
      const Token = Math.floor(1000 + Math.random() * 9000);
      const sql_store_token =
        "INSERT INTO `verifyemail` (`email`,`token`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `token` = ?";
      conn_sql.query(sql_store_token, [email, Token, Token], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database token storage error", err });
        } else {
          SendForgotPasswordEmail(email, Token);
          return res.json({ msg: "Verification token sent successfully!", result });
        }
      });
    }
  });
};
//Forget Password (For Admin)
const forgetPasswordForAdmin = (req, res) => {
  const { email, token, password } = req.body;
  const sql_user = "SELECT * FROM `admin` WHERE email = ?";
  conn_sql.query(sql_user, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const sql_token =
      "SELECT token FROM `verifyemail` WHERE email = ? AND token = ?";
    conn_sql.query(sql_token, [email, token], (err, tokenResult) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error", err });
      }

      if (tokenResult.length === 0) {
        return res.status(400).json({ message: "Invalid token" });
      }

      // Hash the new password before updating
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          return res.status(500).json({ message: "Error hashing password", hashErr });
        }

        const sql_update_password =
          "UPDATE `admin` SET password = ? WHERE email = ?";
        conn_sql.query(sql_update_password, [hashedPassword, email], (updateErr, updateResult) => {
          if (updateErr) {
            return res.status(500).json({ message: "Error updating password", updateErr });
          }

          return res
            .status(200)
            .json({ message: "Password updated successfully!" });
        });
      });
    });
  });
};

//Forget Password

const forgetPassword = (req, res) => {
  const { email, token, password } = req.body;

  const sql_user = "SELECT * FROM `user_accounts` WHERE email = ?";
  conn_sql.query(sql_user, [email], (err, userResult) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", err });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const sql_token =
      "SELECT token FROM `verifyemail` WHERE email = ? AND token = ?";
    conn_sql.query(sql_token, [email, token], (err, tokenResult) => {
      if (err) {
        return res.status(500).json({ message: "Error verifying token", err });
      }

      if (tokenResult.length === 0) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Hash the new password
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          return res
            .status(500)
            .json({ message: "Error hashing password", hashErr });
        }

        const sql_forget =
          "UPDATE `user_accounts` SET `password` = ? WHERE email = ?";
        conn_sql.query(
          sql_forget,
          [hashedPassword, email],
          (updateErr, updateResult) => {
            if (updateErr) {
              return res
                .status(500)
                .json({ message: "Error updating password", updateErr });
            }

            return res.json({
              message: "Updated Password Successfully!",
              updateResult,
            });
          }
        );
      });
    });
  });
};

// For home page get total jobs
const GetTotalJobs = (req, res) => {
  const sql =
    "SELECT COUNT(*) as TotalJobs FROM jobs WHERE status = 'Open' AND expiry_date >= CURDATE()";
  conn_sql.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ TotalJobs: result[0].TotalJobs });
  });
};

// Get latest jobs for Next.js landing page
const GetLatestJobs = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  const sql = `
    SELECT 
      jobs.id, 
      jobs.title, 
      jobs.job_type, 
      jobs.workplace_type, 
      jobs.city, 
      jobs.province, 
      jobs.minimum_currency, 
      jobs.maximum_currency, 
      jobs.currency, 
      jobs.Rate, 
      jobs.Experience, 
      jobs.expiry_date,
      jobs.required_skills,
      COALESCE(companies.name, jobs.company_name) AS company_name, 
      companies.images AS company_logo
    FROM jobs 
    LEFT JOIN companies ON (jobs.company_name = companies.name OR jobs.company_name = CAST(companies.id AS CHAR))
    WHERE jobs.status != 'Closed' OR jobs.status IS NULL
    ORDER BY jobs.id DESC 
    LIMIT ?
  `;

  conn_sql.query(sql, [limit], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch latest jobs", details: err });
    }
    
    const portalBaseUrl = process.env.PORTAL_URL || "https://jobs.hirix.pk";
    const jobsWithLinks = results.map(job => ({
      ...job,
      portal_apply_url: `${portalBaseUrl}/JobPage/${job.id}`
    }));

    return res.json(jobsWithLinks);
  });
};

// Send Contact Email Query
const SendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ msg: "All fields (name, email, subject, message) are required." });
  }

  try {
    await SendContactFormEmail(name, email, subject, message);
    return res.json({ msg: "Your message has been sent successfully! We will get back to you shortly." });
  } catch (error) {
    console.error("SendContactEmail Error:", error);
    return res.status(500).json({ msg: "Failed to send email. Please try again later.", error: error.message });
  }
};

module.exports = {
  GetpostsByAdmin,
  Getposts,
  Getpostbyid,
  Getreviews,
  filtersCount,
  forgetPassword,
  SendCode,
  SendCodeForAdmin,
  forgetPasswordForAdmin,
  GetSpecificPost,
  GetTotalJobs,
  GetLatestJobs,
  SendContactEmail,
};
