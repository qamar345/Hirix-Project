const { conn_sql } = require("../../config/connection");

const upload = require("../../middleware/upload");

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
      const sql_updateProfile = `
          UPDATE user_accounts
          SET first_name = ?, last_name = ?, image = ?, email = ?, phone = ?, qualification = ?, province = ?, location = ?
          WHERE id = ?
        `;

      conn_sql.query(
        sql_updateProfile,
        [
          first_name,
          last_name,
          imageUrl,
          email,
          phone,
          qualification,
          province,
          location,
          id,
        ],
        (err, updateResult) => {
          if (err) {
            return res.json({ msg: "Error", err });
          }
          const sql_insertDetails = `
              INSERT INTO user_details (user_id, CurrentPosition, Category, Description, DOP, Age, Gender, Language, Experience, offer_salary, Salary_type, Currency, LinkedIn)
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
            (err, detailsResult) => {
              if (err) {
                console.log(err);
                return res.json({ msg: "Error inserting user details", err });
              }

              return res.json({ msg: "Profile Publish", detailsResult });
            }
          );
        }
      );
    } else {
      return res.json({ msg: "User not found" });
    }
  });
};

// Add Education
const Education = (req, res) => {
  const bodyData = { ...req.body };
  const { id } = req.params;

  const { Title, Level, From, To, Description } = bodyData;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Database error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const sql_insertDetails = `
        INSERT INTO user_qualification (user_id, Title, Level, \`From\`, \`To\`, Description)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    conn_sql.query(
      sql_insertDetails,
      [id, Title, Level, From, To, Description],
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

    const sql_insertDetails = `
        INSERT INTO user_experience (user_id, Title, Company, \`From\`, \`To\`, Description)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    conn_sql.query(
      sql_insertDetails,
      [id, Title, Company, From, To, Description],
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
        INSERT INTO user_projects (user_id, Title, Link, Description)
        VALUES (?, ?, ?, ?)
      `;

    conn_sql.query(
      sql_insertDetails,
      [id, Title, Link, Description],
      (err, detailsResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res
            .status(500)
            .json({ msg: "Failed to add project", err });
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

  const { Title, date_awarded, Description } = bodyData;

  const sql_checkUser = "SELECT * FROM user_accounts WHERE id = ?";

  conn_sql.query(sql_checkUser, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Database error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const sql_insertDetails = `
        INSERT INTO user_awards (user_id, Title, date_awarded, Description)
        VALUES (?, ?, ?, ?)
      `;

    conn_sql.query(
      sql_insertDetails,
      [id, Title, date_awarded, Description],
      (err, detailsResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res
            .status(500)
            .json({ msg: "Failed to add award", err });
        }

        return res
          .status(200)
          .json({ msg: "Award added", data: detailsResult });
      }
    );
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
      const query1 = "SELECT first_name, last_name, image, email, phone, qualification, province, location FROM user_accounts WHERE id = ?";
      const query2 = "SELECT CurrentPosition, Category, Description, DOP, Age, Gender, Language, Experience, offer_salary, Salary_type, Currency, LinkedIn FROM user_details WHERE user_id = ?";
  
      conn_sql.query(query1, [id], (err, result1) => {
        if (err) return resolve();
        const userInfo = result1[0];
        const allInfoFieldsFilled = userInfo &&
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
            const allDetailsFieldsFilled = userDetails &&
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

module.exports = { ProfileBasicInfo, Education , Experience, Project , Award, getUserProfileStatus};
