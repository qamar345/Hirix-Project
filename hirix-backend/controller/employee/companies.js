const { conn_sql } = require("../../config/connection");
const crypto = require("crypto");
const upload = require("../../middleware/upload");
const { v4: uuidv4 } = require("uuid");
const { SendCompanyVerificationEmail } = require("../../mailer/mailer-controller");

// Confirms the company at :id belongs to the authenticated employee (or the
// caller is an admin) before allowing a read/mutation.
function withCompanyOwnership(req, res, onOwned) {
  const { id } = req.params;
  conn_sql.query("SELECT id, user_account_id FROM companies WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Company not found" });
    }
    const company = rows[0];
    const isOwner = req.user && String(company.user_account_id) === String(req.user.id);
    const isAdmin = req.user && req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "You do not have access to this company" });
    }
    onOwned(company);
  });
}

//  Add Companies
const Addcompany = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const { id } = req.params;
  const {
    name,
    categories,
    About,
    website_link,
    Contact,
    E_mail,
    total_members,
    province,
    city,
    Ntn,
    location,
    twitter,
    facebook,
    instagram,
    linkedIn,
  } = bodyData;
  
  const token = uuidv4();
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  const sql_addcompany =
    "INSERT INTO `companies` (`user_account_id`,`name`, `categories`,`About`,`website_link`,`Contact`, `E_mail`,`total_members`,`images` ,`province`,`city`,`Ntn`,`location`, `email_verification_token`, `is_email_verified`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
  conn_sql.query(
    sql_addcompany,
    [
      id,
      name,
      categories,
      About,
      website_link,
      Contact,
      E_mail,
      total_members,
      imageUrl,
      province,
      city,
      Ntn,
      location || "",
      token
    ],
    async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        const companyId = result.insertId;

        // Send the verification email in the background instead of awaiting
        // it here: the SMTP fallback chain can take longer than the reverse
        // proxy's upstream timeout, which was turning a slow-but-eventually
        // -successful send into a 502 before the app ever responded.
        if (E_mail) {
          SendCompanyVerificationEmail(E_mail, token, name).catch((mailErr) => {
            console.error("Failed to send company verification email:", mailErr.message || mailErr);
          });
        }

        const sql_company =
          "INSERT INTO `companies_social_networks` (`companies_id`,`twitter`, `facebook`, `instagram`,`linkedIn`) VALUES (?, ?, ?, ?, ?)";
        conn_sql.query(
          sql_company,
          [companyId, twitter, facebook, instagram, linkedIn],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ msg: "Database error" });
            } else {
              return res.json({
                msg: E_mail
                  ? "Company added. A verification email is on its way — please check your inbox shortly."
                  : "Company added.",
                result,
              });
            }
          }
        );
      }
    }
  );
};

//Edit companies data
const Editcompany = (req, res) => {
  const { id } = req.params;
  const {
    name,
    categories,
    About,
    website_link,
    Contact,
    E_mail,
    founded_in,
    total_members,
    twitter,
    facebook,
    instagram,
    linkedIn,
    province,
    city,
    Ntn,
  } = req.body;

  withCompanyOwnership(req, res, () => {
    const sql_addcompany =
      "UPDATE `companies` SET `name`=? , `categories`=? ,`About`=? , `website_link`=? ,`Contact`=? , `E_mail`=? ,`founded_in` = ? ,`total_members`= ? ,`province`=?, `city` = ?, `Ntn` = ? WHERE id=?";
    conn_sql.query(
      sql_addcompany,
      [
        name,
        categories,
        About,
        website_link,
        Contact,
        E_mail,
        founded_in,
        total_members,
        province,
        city,
        Ntn,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Database error" });
        } else {
          const sql_updatelinks =
            "UPDATE `companies_social_networks` SET `twitter`=? , `facebook`=? , `instagram`= ?, `linkedIn`= ? WHERE companies_id = ?";
          conn_sql.query(
            sql_updatelinks,
            [twitter, facebook, instagram, linkedIn, id],
            (err, result) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Database error" });
              } else {
                return res.json({ msg: "Updated...", result });
              }
            }
          );
        }
      }
    );
  });
};

//  For Select company (showing all his/her companies)
const Selectcompany = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;
  const { id } = req.params;

  // Pehle total count fetch karein
  const sql_count =
    "SELECT COUNT(*) AS total FROM `companies` WHERE user_account_id = ? AND status_delete = 1 AND name LIKE ?";
  conn_sql.query(sql_count, [id, `%${search}%`], (count_err, count_result) => {
    if (count_err) {
      return res.json({ error: count_err });
    }

    const totalData = count_result[0].total;
    const totalPages = Math.ceil(totalData / limit);

    // Ab actual companies ka data fetch karein
    const sql_get =
      " SELECT c.*, (SELECT COUNT(*) FROM jobs j WHERE j.company_name = c.id AND j.status = 'open') AS active_jobs FROM companies c WHERE c.user_account_id = ? AND c.status_delete = 1 AND c.name LIKE ? LIMIT ? OFFSET ?";

    conn_sql.query(sql_get, [id, `%${search}%`, limit, offset], (c_err, c_data) => {
      if (c_err) {
        return res.json({ error: c_err });
      }

      return res.json({
        data: c_data,
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
};

// Delete Company
const DeleteCompany = (req, res) => {
  const { id } = req.params;

  withCompanyOwnership(req, res, () => {
    const sql_update =
      "UPDATE `companies` SET `status_delete` = 0 WHERE `id` = ?";
    conn_sql.query(sql_update, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Company not found" });
      }
      return res.json({ msg: "Company deleted successfully!" });
    });
  });
};

// Get specific company
const GetCompanySpecific = (req, res) => {
  withCompanyOwnership(req, res, (company) => {
    const sql_get = "SELECT * FROM `companies` WHERE id = ?";
    conn_sql.query(sql_get, [company.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json(result);
      }
    });
  });
};

const ResendCompanyVerification = (req, res) => {
  withCompanyOwnership(req, res, (company) => {
    const sql_get = "SELECT name, E_mail, email_verification_token, is_email_verified FROM `companies` WHERE id = ?";
    conn_sql.query(sql_get, [company.id], async (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({ msg: "Company not found" });
      }
      const fullCompany = result[0];
      if (fullCompany.is_email_verified === 1) {
        return res.json({ msg: "Company is already verified!" });
      }

      let token = fullCompany.email_verification_token;
      if (!token) {
        token = uuidv4();
        const sql_update = "UPDATE `companies` SET `email_verification_token` = ? WHERE id = ?";
        conn_sql.query(sql_update, [token, company.id]);
      }

      SendCompanyVerificationEmail(fullCompany.E_mail, token, fullCompany.name).catch((mailErr) => {
        console.error("Failed to resend company verification email:", mailErr.message || mailErr);
      });
      return res.json({ msg: "Verification link is being resent to " + fullCompany.E_mail });
    });
  });
};

module.exports = {
  Addcompany,
  Editcompany,
  Selectcompany,
  DeleteCompany,
  GetCompanySpecific,
  ResendCompanyVerification,
};
