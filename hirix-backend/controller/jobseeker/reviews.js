const { conn_sql } = require("../../config/connection");

// Add review
const AddReview = (req, res) => {
    const {review} = req.body;
    const sqlreview = "INSERT INTO `reviews` (`review`) VALUES (?)";
  conn_sql.query(sqlreview, [review], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({msg: "Posted...", result});
    }
  });
};

// Edit review 
const editreview = (req, res) => {
  const {id} = req.params;
  const {review} = req.body;
  const sqleditreview = "UPDATE `reviews` SET `review`=?  WHERE id=?";
conn_sql.query(sqleditreview, [review, id ], (err, result) => {
  if (err) {
    return res.json(err);
  } else {
    return res.json({msg: "Updated...", result});
  }
});
};

module.exports = {AddReview, editreview};