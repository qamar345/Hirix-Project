const { conn_sql } = require("../../config/connection");

// Job Review (status review)
const status_review = (req, res) => {
  const { id } = req.params;
  const sql_status = "UPDATE `applicants` SET `status`= 'Review' WHERE id=?";
  conn_sql.query(sql_status, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Status Updated...", result });
    }
  });
};

// Job Review (status Selected)
const status_selected = (req, res) => {
  const { id } = req.params;
  const sql_status = "UPDATE `applicants` SET `status`= 'Selected' WHERE id=?";
  conn_sql.query(sql_status, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Status Updated...", result });
    }
  });
};

// Job Review (status Rejected)
const status_rejected = (req, res) => {
  const { id } = req.params;
  const sql_status_reject =
    "UPDATE `applicants` SET `status`= 'Rejected' WHERE id=?";
  conn_sql.query(sql_status_reject, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Status Updated...", result });
    }
  });
};

// get all data of applicants
const GetFullApplicantProfile = (req, res) => {
  const { id } = req.params;

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

    profile.user = userResult[0];

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
};

module.exports = {
  status_review,
  status_selected,
  status_rejected,
  GetFullApplicantProfile,
};
