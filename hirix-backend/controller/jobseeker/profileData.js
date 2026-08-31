const { conn_sql } = require("../../config/connection");
const { chromium } = require("playwright");
const upload = require("../../middleware/upload");

// Launching a fresh Chromium process per CV request (previous behavior) is
// expensive - tens of MB and real CPU/startup time on every call - and with
// no dedicated concurrency limit, a handful of overlapping requests could
// exhaust memory on a small server. Keep one browser instance alive and
// reuse it; each request still gets its own isolated context/page.
let browserInstance = null;
let browserLaunching = null;

async function getSharedBrowser() {
  if (browserInstance && browserInstance.isConnected()) return browserInstance;
  if (browserLaunching) return browserLaunching;

  browserLaunching = chromium
    .launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    .then((browser) => {
      browser.on("disconnected", () => {
        browserInstance = null;
      });
      browserInstance = browser;
      browserLaunching = null;
      return browser;
    })
    .catch((err) => {
      browserLaunching = null;
      throw err;
    });

  return browserLaunching;
}

// Minimal HTML-escaping for interpolating user-supplied text into the
// server-rendered CV template (prevents stored/reflected script injection
// into the Playwright-rendered page).
function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  // Only allow http(s) links through as href attributes; anything else
  // (javascript:, data:, etc.) is neutralized.
  const str = String(value || "");
  if (!/^https?:\/\//i.test(str)) return "#";
  return escapeHtml(str);
}

// Get Profile data
const GetProfile = (req, res) => {
  const { id } = req.params;
  const getdata =
    " SELECT ua.id, ua.first_name, ua.last_name, ua.email,ua.phone, ua.qualification, ua.location, ua.province, ud.CurrentPosition, ud.Category, ud.Description, ud.DOP, ud.Age, ud.LinkedIn, ud.Gender,ud.Language, ud.Experience,ud.offer_salary, ud.Salary_type, ud.Currency FROM user_accounts ua LEFT JOIN user_details ud ON ua.id = ud.user_id WHERE ua.id = ?";
  conn_sql.query(getdata, [id], (error, results) => {
    if (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(results[0]);
  });
};

// Add Profile basic info
const ProfileBasicInfo = (req, res) => {
  const bodyData = { ...req.body };
  const { id } = req.params;

  const {
    first_name,
    last_name,
    email,
    phone,
    qualification,
    CurrentPosition,
    Category,
    Description,
    DOP,
    Age,
    Gender,
    Language,
    Experience,
    offer_salary,
    Salary_type,
    Currency,
    province,
    location,
    LinkedIn,
  } = bodyData;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.json({ msg: "Error", err });
    }

    if (result.length > 0) {
      // Only overwrite the stored image when a new file was actually
      // uploaded - otherwise a plain "save the form" (no new photo picked)
      // would blank out the existing photo every time.
      const sql_updateProfile = imageUrl
        ? `
          UPDATE user_accounts
          SET first_name = ?, last_name = ?, image = ?, email = ?, phone = ?, qualification = ?, province = ?, location = ?
          WHERE id = ?
        `
        : `
          UPDATE user_accounts
          SET first_name = ?, last_name = ?, email = ?, phone = ?, qualification = ?, province = ?, location = ?
          WHERE id = ?
        `;

      const updateParams = imageUrl
        ? [
            first_name,
            last_name,
            imageUrl,
            email,
            phone,
            qualification,
            province,
            location,
            id,
          ]
        : [
            first_name,
            last_name,
            email,
            phone,
            qualification,
            province,
            location,
            id,
          ];

      conn_sql.query(
        sql_updateProfile,
        updateParams,
        (err, updateResult) => {
          if (err) {
            return res.json({ msg: "Error", err });
          }
          const sql_checkDetails =
            "SELECT * FROM user_details WHERE user_id = ?";

          conn_sql.query(sql_checkDetails, [id], (err, checkDetailsResult) => {
            if (err) {
              console.log(err);
              return res.json({ msg: "Error checking user details", err });
            }

            if (checkDetailsResult.length > 0) {
              // ✅ UPDATE existing details
              const sql_updateDetails = `
      UPDATE user_details
      SET 
        CurrentPosition = ?, 
        Category = ?, 
        Description = ?, 
        DOP = ?, 
        Age = ?, 
        Gender = ?, 
        Language = ?, 
        Experience = ?, 
        offer_salary = ?, 
        Salary_type = ?, 
        Currency = ?, 
        LinkedIn = ?
      WHERE user_id = ?
    `;

              conn_sql.query(
                sql_updateDetails,
                [
                  CurrentPosition,
                  Category,
                  Description,
                  DOP,
                  Age,
                  Gender,
                  Language,
                  Experience,
                  offer_salary,
                  Salary_type,
                  Currency,
                  LinkedIn,
                  id,
                ],
                (err, updateResult) => {
                  if (err) {
                    console.log(err);
                    return res.json({
                      msg: "Error updating user details",
                      err,
                    });
                  }

                  return res.json({
                    msg: "Profile Updated",
                    image: imageUrl,
                    firstName: first_name,
                  });
                }
              );
            } else {
              const sql_insertDetails = `
      INSERT INTO user_details 
      (user_id, CurrentPosition, Category, Description, DOP, Age, Gender, Language, Experience, offer_salary, Salary_type, Currency, LinkedIn)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

              conn_sql.query(
                sql_insertDetails,
                [
                  id,
                  CurrentPosition,
                  Category,
                  Description,
                  DOP,
                  Age,
                  Gender,
                  Language,
                  Experience,
                  offer_salary,
                  Salary_type,
                  Currency,
                  LinkedIn,
                ],
                (err, insertResult) => {
                  if (err) {
                    console.log(err);
                    return res.json({
                      msg: "Error inserting user details",
                      err,
                    });
                  }

                  return res.json({ msg: "Profile Published", insertResult });
                }
              );
            }
          });
        }
      );
    } else {
      return res.json({ msg: "User not found" });
    }
  });
};

// A bare year ("2018"), a full date ("2018-09-01"), or "Present"/blank
// (still ongoing, or left unset) - the DB columns are nullable ints, so
// anything that isn't a real parseable date becomes NULL instead of the
// NaN that new Date(x).getFullYear() would silently produce.
function parseYear(value) {
  if (!value || value === "Present") return null;
  const year = new Date(value).getFullYear();
  return Number.isNaN(year) ? null : year;
}

// Add Education
const Education = (req, res) => {
  const bodyData = { ...req.body };
  const { id } = req.params;

  const { Title, Institute, Field, From, To } = bodyData;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Database error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const sql_insertDetails =
      "INSERT INTO `user_qualification`(`user_id`, `degree_title`, `institute_name`, `field_of_study`, `start_year`, `end_year`) VALUES (?, ?, ?, ?, ?, ?)";

    conn_sql.query(
      sql_insertDetails,
      [
        id,
        Title,
        Institute,
        Field,
        parseYear(From),
        parseYear(To),
      ],
      (err, detailsResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res
            .status(500)
            .json({ msg: "Failed to add qualification", err });
        }

        return res
          .status(200)
          .json({ msg: "Qualification added", data: detailsResult });
      }
    );
  });
};

const GetEducation = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `user_qualification` WHERE `user_id` = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    return res.json(result);
  });
};

// Add Experience
const Experience = (req, res) => {
  const bodyData = { ...req.body };
  const { id } = req.params;

  const { Title, Company, From, To, Description } = bodyData;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Database error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const sql_insertDetails =
      "INSERT INTO `user_experience`(`user_id`, `job_title`, `company_name`, `start_date`, `end_date`, `description`) VALUES (?, ?, ?, ?, ?, ?)";

    conn_sql.query(
      sql_insertDetails,
      [
        id,
        Title,
        Company,
        parseYear(From),
        parseYear(To),
        Description,
      ],
      (err, detailsResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res
            .status(500)
            .json({ msg: "Failed to add qualification", err });
        }

        return res
          .status(200)
          .json({ msg: "Experience added", data: detailsResult });
      }
    );
  });
};

const GetExperience = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `user_experience` WHERE `user_id` = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    return res.json(result);
  });
};

// Add Project

const Project = (req, res) => {
  const bodyData = { ...req.body };
  const { id } = req.params;

  const { Title, Link, Description } = bodyData;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Database error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const sql_insertDetails = `
        INSERT INTO user_projects (user_id, title, link, description)
        VALUES (?, ?, ?, ?)
      `;

    conn_sql.query(
      sql_insertDetails,
      [id, Title, Link, Description],
      (err, detailsResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ msg: "Failed to add project", err });
        }

        return res
          .status(200)
          .json({ msg: "Project added", data: detailsResult });
      }
    );
  });
};

// Add Award
const Award = (req, res) => {
  const bodyData = { ...req.body };
  const { id } = req.params;

  const { Title, AwardedBy, date_awarded, Description } = bodyData;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Database error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const sql_insertDetails =
      "INSERT INTO `user_awards`(`user_id`, `title`, `description`, `awarded_by`, `award_date`) VALUES (?, ?, ?, ?, ?)";

    conn_sql.query(
      sql_insertDetails,
      [id, Title, Description, AwardedBy, date_awarded || null],
      (err, detailsResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ msg: "Failed to add award", err });
        }

        return res
          .status(200)
          .json({ msg: "Award added", data: detailsResult });
      }
    );
  });
};

const GetAwards = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `user_awards` WHERE `user_id` = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    return res.json(result);
  });
};

// Calculate Percentage
const getUserProfileStatus = (req, res) => {
  const { id } = req.params;

  let status = {
    info: false,
    education: false,
    experience: false,
    skills: false,
    projects: false,
    awards: false,
  };

  let completed = 0;
  const totalSections = Object.keys(status).length;

  const checkInfo = () => {
    return new Promise((resolve) => {
      const query1 =
        "SELECT first_name, last_name, image, email, phone, qualification, province, location FROM user_accounts WHERE id = ?";
      const query2 =
        "SELECT CurrentPosition, Category, Description, DOP, Age, Gender, Language, Experience, offer_salary, Salary_type, Currency, LinkedIn FROM user_details WHERE user_id = ?";

      conn_sql.query(query1, [id], (err, result1) => {
        if (err) return resolve();
        const userInfo = result1[0];
        const allInfoFieldsFilled =
          userInfo &&
          userInfo.first_name &&
          userInfo.last_name &&
          userInfo.image &&
          userInfo.email &&
          userInfo.phone &&
          userInfo.qualification &&
          userInfo.province &&
          userInfo.location;

        if (allInfoFieldsFilled) {
          conn_sql.query(query2, [id], (err, result2) => {
            if (err) return resolve();
            const userDetails = result2[0];
            const allDetailsFieldsFilled =
              userDetails &&
              userDetails.CurrentPosition &&
              userDetails.Category &&
              userDetails.Description &&
              userDetails.DOP &&
              userDetails.Age &&
              userDetails.Gender &&
              userDetails.Language &&
              userDetails.Experience &&
              userDetails.offer_salary &&
              userDetails.Salary_type &&
              userDetails.Currency &&
              userDetails.LinkedIn;

            if (allDetailsFieldsFilled) {
              status.info = true;
              completed++;
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  };

  const checkEducation = () => {
    return new Promise((resolve) => {
      const q = "SELECT * FROM user_qualification WHERE user_id = ?";
      conn_sql.query(q, [id], (err, result) => {
        if (!err && result.length > 0) {
          status.education = true;
          completed++;
        }
        resolve();
      });
    });
  };

  const checkExperience = () => {
    return new Promise((resolve) => {
      const q = "SELECT * FROM user_experience WHERE user_id = ?";
      conn_sql.query(q, [id], (err, result) => {
        if (!err && result.length > 0) {
          status.experience = true;
          completed++;
        }
        resolve();
      });
    });
  };

  const checkSkills = () => {
    return new Promise((resolve) => {
      const q = "SELECT * FROM jobseeker_skills WHERE job_seeker_id = ?";
      conn_sql.query(q, [id], (err, result) => {
        if (!err && result.length > 0) {
          status.skills = true;
          completed++;
        }
        resolve();
      });
    });
  };

  const checkProjects = () => {
    return new Promise((resolve) => {
      const q = "SELECT * FROM user_projects WHERE user_id = ?";
      conn_sql.query(q, [id], (err, result) => {
        if (!err && result.length > 0) {
          status.projects = true;
          completed++;
        }
        resolve();
      });
    });
  };

  const checkAwards = () => {
    return new Promise((resolve) => {
      const q = "SELECT * FROM user_awards WHERE user_id = ?";
      conn_sql.query(q, [id], (err, result) => {
        if (!err && result.length > 0) {
          status.awards = true;
          completed++;
        }
        resolve();
      });
    });
  };

  Promise.all([
    checkInfo(),
    checkEducation(),
    checkExperience(),
    checkSkills(),
    checkProjects(),
    checkAwards(),
  ]).then(() => {
    const percentage = Math.round((completed / totalSections) * 100);
    res.status(200).json({ status, percentage });
  });
};

const GenerateCv = (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(String(id))) {
    return res.status(400).json({ msg: "Invalid id" });
  }

  // Fetch all data in parallel
  const queries = {
    user: "SELECT first_name, last_name, email, image, phone, location FROM user_accounts WHERE id = ?",
    exp: "SELECT job_title, company_name, start_date, end_date, description FROM user_experience WHERE user_id = ?",
    edu: "SELECT degree_title, field_of_study, institute_name, start_year, end_year FROM user_qualification WHERE user_id = ?",
    skills: "SELECT skillset.name as skill_name FROM jobseeker_skills JOIN skillset ON jobseeker_skills.skillset_id = skillset.id WHERE jobseeker_skills.job_seeker_id = ?",
    awards: "SELECT title, awarded_by, award_date, description FROM user_awards WHERE user_id = ?",
    projects: "SELECT title, description, link FROM user_projects WHERE user_id = ?",
  };

  conn_sql.query(queries.user, [id], (err, userRows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (userRows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    const user = userRows[0];

    conn_sql.query(queries.exp, [id], (err, expRows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      }

      conn_sql.query(queries.edu, [id], (err, eduRows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Database error" });
        }

        conn_sql.query(queries.skills, [id], (err, skillRows) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Database error" });
          }

          conn_sql.query(queries.awards, [id], (err, awardRows) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ msg: "Database error" });
            }

            conn_sql.query(queries.projects, [id], async (err, projectRows) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Database error" });
              }

              // Watermark CSS
              const watermarkCSS = `
                body::before {
                  content: "Hirix.pk";
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(-30deg);
                  font-size: 100px;
                  color: rgba(0, 0, 0, 0.05);
                  z-index: -1;
                  white-space: nowrap;
                }
              `;

              // HTML Template
              const html = `
                <html>
                <head>
                  <style>
                    body { font-family: Arial, sans-serif; padding: 20px; position: relative; }
                    ${watermarkCSS}
                    h1 { color: rgb(18, 110, 187); }
                    h2 { margin-top: 20px; border-bottom: 1px solid #ccc; }
                    img { width: 100px; border-radius: 50%; }
                    ul { padding-left: 20px; }
                  </style>
                </head>
                <body>
                 <div style="text-align: center;">
                    <h1>${escapeHtml(user.first_name)} ${escapeHtml(user.last_name)}</h1>
                    <p>${escapeHtml(user.email)}</p>
                    <p>${escapeHtml(user.phone)}</p>
                    <p>${escapeHtml(user.location)}</p>
                  </div>
                  <h2>Experience</h2>
                  <ul>
                    ${expRows
                      .map(
                        (e) =>
                          `<li><b>${escapeHtml(e.job_title)}</b> at ${escapeHtml(e.company_name)} (${escapeHtml(e.start_date)} - ${escapeHtml(e.end_date)})<br>${escapeHtml(e.description)}</li>`
                      )
                      .join("")}
                  </ul>

                  <h2>Education</h2>
                  <ul>
                    ${eduRows
                      .map(
                        (e) =>
                          `<li>${escapeHtml(e.degree_title)} in ${escapeHtml(e.field_of_study)} - ${escapeHtml(e.institute_name)} (${escapeHtml(e.start_year)} - ${escapeHtml(e.end_year)})</li>`
                      )
                      .join("")}
                  </ul>

                  <h2>Skills</h2>
                  <p>${skillRows.map((s) => escapeHtml(s.skill_name)).join(", ")}</p>

                  <h2>Awards</h2>
                  <ul>
                    ${awardRows
                      .map(
                        (a) =>
                          `<li>${escapeHtml(a.title)} <br> ${escapeHtml(a.awarded_by)} <br> ${escapeHtml(a.award_date)}</li>`
                      )
                      .join("")}
                  </ul>

                  <h2>Projects</h2>
                  <ul>
                    ${projectRows
                      .map(
                        (p) =>
                          `<li><b>${escapeHtml(p.title)}</b> <br> Project: <a href="${escapeAttr(p.link)}" target="_blank">Link</a><br>${escapeHtml(p.description)}</li>`
                      )
                      .join("")}
                  </ul>
                </body>
                </html>
              `;

              // Generate PDF using the shared browser instance - only the
              // per-request context/page is created and torn down here.
              let context;
              try {
                const browser = await getSharedBrowser();

                context = await browser.newContext({
                  // Emulate print media to include backgrounds
                  // (Playwright applies printBackground automatically for pdf)
                  viewport: { width: 1200, height: 800 }, // optional
                  // This is a static resume document, not an interactive page -
                  // disabling JS closes off script-injection/SSRF vectors via
                  // profile text fields rendered into the template above.
                  javaScriptEnabled: false,
                });

                const page = await context.newPage();
                await page.setContent(html, { waitUntil: "load" });

                const pdfBuffer = await page.pdf({
                  format: "A4",
                  printBackground: true,
                });

                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Length", pdfBuffer.length);
                res.setHeader(
                  "Content-Disposition",
                  "inline; filename=resume.pdf"
                );
                res.send(pdfBuffer);
              } catch (pdfErr) {
                console.error("CV generation error:", pdfErr);
                if (!res.headersSent) {
                  res.status(500).json({ msg: "Failed to generate CV" });
                }
              } finally {
                if (context) await context.close();
              }
            });
          });
        });
      });
    });
  });
};

module.exports = {
  GetProfile,
  ProfileBasicInfo,
  Education,
  Experience,
  Project,
  Award,
  getUserProfileStatus,
  GetEducation,
  GetExperience,
  GetAwards,
  GenerateCv,
};
