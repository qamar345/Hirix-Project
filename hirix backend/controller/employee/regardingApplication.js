const { conn_sql } = require("../../config/connection");

// Job Review (status review)
const status_review = (req, res) => {
    const {id} = req.params;
    const sql_status = "UPDATE `applicants` SET `status`= 'Review' WHERE id=?"
    conn_sql.query(sql_status, [id], (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({msg: "Status Updated...", result});
      }
    });
    };

    // Job Review (status Selected)
const status_selected = (req, res) => {
    const {id} = req.params;
    const sql_status = "UPDATE `applicants` SET `status`= 'Selected' WHERE id=?"
    conn_sql.query(sql_status, [id], (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({msg: "Status Updated...", result});
      }
    });
    };

    // Job Review (status Rejected)
const status_rejected = (req, res) => {
    const {id} = req.params;
    const sql_status_reject = "UPDATE `applicants` SET `status`= 'Rejected' WHERE id=?"
    conn_sql.query(sql_status_reject, [id], (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({msg: "Status Updated...", result});
      }
    });
    };

    module.exports = {status_review , status_selected, status_rejected};