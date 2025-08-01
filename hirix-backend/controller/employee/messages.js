const { conn_sql } = require("../../config/connection");

// Send message
const send_message = (req, res) => {
    const {id} = req.params;
    const {receiver_id, message} = req.body;
    const sql_message = "INSERT INTO `messages` (`sender_id`,`receiver_id`,`message`) VALUES ((SELECT id FROM `user_accounts` WHERE id=?) , ?, ?)";
   conn_sql.query(sql_message, [id, receiver_id,message], (err, result) => {
       if (err) {
         return res.json({ msg: "Error...", err });
       } else {
         return res.json({ msg: "Send", result });
       }
     });
};

// inbox messages
const inbox_message = (req, res) => {
   const  {id} = req.params;
    const sql_inbox_message = "SELECT sender_id,message FROM `messages` WHERE `receiver_id` = ?";
   conn_sql.query(sql_inbox_message, [id], (err, result) => {
       if (err) {
         return res.json({ msg: "Error...", err });
       } else {
         return res.json(result);
       }
     });
};

//outbox messages
const outbox_message = (req, res) => {
    const  {id} = req.params;
     const sql_outbox_message = "SELECT receiver_id,message FROM `messages` WHERE `sender_id` = ?";
    conn_sql.query(sql_outbox_message, [id], (err, result) => {
        if (err) {
          return res.json({ msg: "Error...", err });
        } else {
          return res.json(result);
        }
      });
 };

//  // see all messages
//  const messages = (req,res) =>{
//     const sql_messages = "SELECT id, sender_id, receiver_id, message FROM `messages`";
//     conn_sql.query(sql_messages, (err, result) => {
//         if (err) {
//             return res.json({ msg: "Error...", err });
//           } else {
//             return res.json(result);
//           }
//     });
//  };

module.exports = { send_message , inbox_message, outbox_message};