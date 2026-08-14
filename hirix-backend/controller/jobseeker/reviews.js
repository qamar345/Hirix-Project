const { conn_sql } = require("../../config/connection");

// Add review
const AddReview = (req, res) => {
    const {review} = req.body;
    const sqlreview = "INSERT INTO `reviews` (`job_seeker_id`, `review`) VALUES (?, ?)";
  conn_sql.query(sqlreview, [req.user && req.user.id, review], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    } else {
      return res.json({msg: "Posted...", result});
    }
  });
};

// Edit review
const editreview = (req, res) => {
  const {id} = req.params;
  const {review} = req.body;

  conn_sql.query("SELECT job_seeker_id FROM `reviews` WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Review not found" });
    }
    if (!req.user || String(rows[0].job_seeker_id) !== String(req.user.id)) {
      return res.status(403).json({ msg: "You do not have access to this review" });
    }

    const sqleditreview = "UPDATE `reviews` SET `review`=?  WHERE id=?";
    conn_sql.query(sqleditreview, [review, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Database error" });
      } else {
        return res.json({msg: "Updated...", result});
      }
    });
  });
};

module.exports = {AddReview, editreview};