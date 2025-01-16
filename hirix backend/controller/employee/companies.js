const { conn_sql } = require("../../config/connection");

const crypto = require("crypto");

// const nodemailer = require ('nodemailer');

//  Add Companies
const Addcompany = (req, res) => {
  const { id } = req.params;
  const {
    name,
    categories,
    website_link,
    About,
    Contact,
    E_mail,
    total_members,
    images,
    location,
    twitter,
    facebook,
    instagram,
    youtube,
  } = req.body;
  console.log(req.body);
  const sql_addcompany =
    "INSERT INTO `companies` (`user_account_id`,`name`, `categories`, `website_link`, `About`,`Contact`, `E_mail`,`total_members`,`images`,`location`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      images,
      location,
    ],
    (err, result) => {
      if (err) {
        return res.json({ msg: "Error...", err });
      } else {
        const companyId = result.insertId;
        const sql_company =
          "INSERT INTO `companies_social_networks` (`companies_id`,`twitter`, `facebook`, `instagram`,`youtube`) VALUES (?, ?, ?, ?, ?)";
        conn_sql.query(
          sql_company,
          [companyId, twitter, facebook, instagram, youtube],
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
    website_link,
    About,
    Contact,
    E_mail,
    total_members,
    images,
    location,
    twitter,
    facebook,
    instagram,
    youtube,
  } = req.body;
  const sql_addcompany =
    "UPDATE `companies` SET `name`=? , `categories`=? , `website_link`=? , `About`=? , `Contact`=? , `E_mail`=? ,`total_members`=? ,`images`=?,`location`=? WHERE id=?";
  conn_sql.query(
    sql_addcompany,
    [
      name,
      categories,
      website_link,
      About,
      Contact,
      E_mail,
      total_members,
      images,
      location,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.json({ msg: "Error...", err });
      } else {
        const sql_updatelinks =
          "UPDATE `companies_social_networks` SET `twitter`=? , `facebook`=? , `instagram`= ?, `youtube`= ? WHERE companies_id = ?";
        conn_sql.query(
          sql_updatelinks,
          [twitter, facebook, instagram, youtube, id],
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
  const { id } = req.params;
  const sql_get = "SELECT name FROM `companies` WHERE user_account_id= ? ";
  conn_sql.query(sql_get, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
};

module.exports = { Addcompany, Editcompany, Selectcompany };
