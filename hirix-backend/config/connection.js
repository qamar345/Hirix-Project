const sql = require ("mysql");

const dotenv= require("dotenv").config();

const host = process.env.HOST;

const user = process.env.USER;

const password = process.env.PASSWORD;

const database = process.env.DATABASE;

const conn_sql = sql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,

});

function databaseconfig() {
    conn_sql.connect((err)=>{
        if(err){
            console.log("Database is not connected", err);
        }else{
            console.log("Database connected");
        }
    });
}

module.exports = {
       databaseconfig,
       conn_sql,
};