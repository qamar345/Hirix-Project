const { conn_sql } = require("../../config/connection");

const crypto = require("crypto");

const upload = require("../../middleware/upload"); 

// const nodemailer = require ('nodemailer');

//  Add Companies
const Addcompany = (req, res) => {
  const bodyData = Object.assign({}, req.body);
  const {id} = req.params;
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
    postalCode,
    twitter,
    facebook,
    instagram,
    linkedIn,
  } = bodyData;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const sql_addcompany =
    "INSERT INTO `companies` (`user_account_id`,`name`, `categories`,`About`,`website_link`,`Contact`, `E_mail`,`total_members`,`images` ,`province`,`city`,`postalCode`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  conn_sql.query(
    sql_addcompany,
    [
      id,
      name,
      categories,
      website_link,
      About,
      Contact,
      E_mail,
      total_members,
      imageUrl,
      province,
      city,
      postalCode
    ],
    (err, result) => {
      if (err) {
        return res.json({ msg: "Error...", err });
      } else {
        const companyId = result.insertId;
        const sql_company =
          "INSERT INTO `companies_social_networks` (`companies_id`,`twitter`, `facebook`, `instagram`,`linkedIn`) VALUES (?, ?, ?, ?, ?)";
        conn_sql.query(
          sql_company,
          [companyId, twitter, facebook, instagram, linkedIn],
          (err, result) => {
            if (err) {
              return res.json({ msg: "Error...", err });
            } else {
              return res.json({ msg: "INSERTED...", result });
            }
          }
        );
      }
    }
  );
};

//Token generate
const codeGenrate = () => Math.floor(Math.random() * 9999);
const token = codeGenrate();
console.log(token);

//Email send function
async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });
}

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
    postalCode
  } = req.body;
  const sql_addcompany =
    "UPDATE `companies` SET `name`=? , `categories`=? ,`About`=? , `website_link`=? ,`Contact`=? , `E_mail`=? ,`founded_in` = ? ,`total_members`= ? ,`province`=?, `city` = ?, `postalCode` = ? WHERE id=?";
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
      postalCode,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.json({ msg: "Error...", err });
      } else {
        const sql_updatelinks =
          "UPDATE `companies_social_networks` SET `twitter`=? , `facebook`=? , `instagram`= ?, `linkedIn`= ? WHERE companies_id = ?";
        conn_sql.query(
          sql_updatelinks,
          [twitter, facebook, instagram, linkedIn, id],
          (err, result) => {
            if (err) throw err;
            else {
               console.log(result);
              return res.json({ msg: "Updated...", result });
            }
          }
        );
      }
    }
  );
};

//  For Select company (showing all his/her companies)
const Selectcompany = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const { id } = req.params;

  // Pehle total count fetch karein
  const sql_count = "SELECT COUNT(*) AS total FROM `companies` WHERE user_account_id = ? AND status_delete = 1 ";
  conn_sql.query(sql_count, [id], (count_err, count_result) => {
    if (count_err) {
      return res.json({ error: count_err });
    }

    const totalData = count_result[0].total;
    const totalPages = Math.ceil(totalData / limit);

    // Ab actual companies ka data fetch karein
    // const sql_get = "SELECT * FROM `companies` WHERE user_account_id = ? LIMIT ? OFFSET ?";
    const sql_get = " SELECT c.*, (SELECT COUNT(*) FROM jobs j WHERE j.company_name = c.name AND j.status = 'open') AS active_jobs FROM companies c WHERE c.user_account_id = ? AND c.status_delete = 1  LIMIT ? OFFSET ?";

    conn_sql.query(sql_get, [id, limit, offset], (c_err, c_data) => {
      if (c_err) {
        return res.json({ error: c_err });
      }

      return res.json({
        data: c_data,
        meta: {
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

  const sql_update = "UPDATE `companies` SET `status_delete` = 0 WHERE `id` = ?";
  conn_sql.query(sql_update, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "SQL Error", error: err.sqlMessage });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Company not found" });
    }
    return res.json({ msg: "Company deleted successfully!" });
  });
};

// Get specific company
const GetCompanySpecific = (req, res) => {
  const {id} = req.params;
  const sql_get = "SELECT * FROM `companies` WHERE id = ?";
  conn_sql.query(sql_get, [id],(err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};



module.exports = { Addcompany, Editcompany, Selectcompany , DeleteCompany, GetCompanySpecific};
