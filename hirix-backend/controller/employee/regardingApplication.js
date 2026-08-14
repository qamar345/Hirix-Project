const { conn_sql } = require("../../config/connection");

// Confirms the applicant row at :id belongs to a job posted by the
// authenticated employee (or the caller is an admin).
function withApplicantOwnership(req, res, onOwned) {
  const { id } = req.params;
  conn_sql.query("SELECT id, employee_id, job_seeker_id FROM applicants WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }
    const applicant = rows[0];
    const isOwner = req.user && String(applicant.employee_id) === String(req.user.id);
    const isAdmin = req.user && req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "You do not have access to this application" });
    }
    onOwned(applicant);
  });
}

// Job Review (status review)
const status_review = (req, res) => {
  withApplicantOwnership(req, res, (applicant) => {
    const sql_status = "UPDATE `applicants` SET `status`= 'Review' WHERE id=?";
    conn_sql.query(sql_status, [applicant.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Status Updated...", result });
      }
    });
  });
};

// Job Review (status Selected)
const status_selected = (req, res) => {
  withApplicantOwnership(req, res, (applicant) => {
    const sql_status = "UPDATE `applicants` SET `status`= 'Selected' WHERE id=?";
    conn_sql.query(sql_status, [applicant.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Status Updated...", result });
      }
    });
  });
};

// Job Review (status Rejected)
const status_rejected = (req, res) => {
  withApplicantOwnership(req, res, (applicant) => {
    const sql_status_reject =
      "UPDATE `applicants` SET `status`= 'Rejected' WHERE id=?";
    conn_sql.query(sql_status_reject, [applicant.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({ msg: "Status Updated...", result });
      }
    });
  });
};

// get all data of applicants
// :id here is the candidate's user_accounts id. An admin may view any
// candidate; an employer may only view candidates who applied to one of
// their own jobs.
const GetFullApplicantProfile = (req, res) => {
  const { id } = req.params;

  const proceed = () => loadApplicantProfile(id, res);

  if (req.user && req.user.role === "admin") {
    return proceed();
  }

  conn_sql.query(
    "SELECT 1 FROM applicants WHERE job_seeker_id = ? AND employee_id = ? LIMIT 1",
    [id, req.user && req.user.id],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      }
      if (rows.length === 0) {
        return res.status(403).json({ msg: "This candidate has not applied to any of your jobs" });
      }
      proceed();
    }
  );
};

function loadApplicantProfile(id, res) {
  const queries = {
    user: "SELECT * FROM user_accounts WHERE id = ?",
    details: "SELECT * FROM user_details WHERE user_id = ?",
    projects: "SELECT * FROM user_projects WHERE user_id = ?",
    awards: "SELECT * FROM user_awards WHERE user_id = ?",
    experience: "SELECT * FROM user_experience WHERE user_id = ?",
    qualification: "SELECT * FROM user_qualification WHERE user_id =?",
    skills:
      "SELECT skillset.name FROM jobseeker_skills JOIN skillset ON jobseeker_skills.skillset_id = skillset.id WHERE job_seeker_id =?",
  };

  const profile = {};

  conn_sql.query(queries.user, [id], (err, userResult) => {
    if (err) return res.status(500).json({ error: "User error", err });

    if (userResult[0]) {
      const { password, ...safeUser } = userResult[0];
      profile.user = safeUser;
    }

    conn_sql.query(queries.details, [id], (err, detailResult) => {
      if (err) return res.status(500).json({ error: "Details error", err });

      profile.details = detailResult[0];

      conn_sql.query(queries.projects, [id], (err, projectsResult) => {
        if (err) return res.status(500).json({ error: "Projects error", err });

        profile.projects = projectsResult;

        conn_sql.query(queries.awards, [id], (err, awardsResult) => {
          if (err) return res.status(500).json({ error: "Awards error", err });

          profile.awards = awardsResult;

          conn_sql.query(queries.experience, [id], (err, expResult) => {
            if (err)
              return res.status(500).json({ error: "Experience error", err });

            profile.experience = expResult;

            conn_sql.query(queries.qualification, [id], (err, qualResult) => {
              if (err)
                return res
                  .status(500)
                  .json({ error: "Qualification error", err });

              profile.qualification = qualResult;

              conn_sql.query(queries.skills, [id], (err, skillsResult) => {
                if (err)
                  return res
                    .status(500)
                    .json({ error: "Qualification error", err });

                profile.skills = skillsResult;

                return res.json(profile);
              });
            });
          });
        });
      });
    });
  });
}

module.exports = {
  status_review,
  status_selected,
  status_rejected,
  GetFullApplicantProfile,
};
