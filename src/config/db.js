const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../../.env')
})
var mysql = require('mysql2');
const { threadId } = require('worker_threads');

var connect = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connect.connect(function(err) {
    if (err) {
        console.error('connection error')
        return;
    }
    console.log("Connected:" + threadId);
    connect.query("CREATE DATABASE mydb", function(err, res) {
        console.log("Databse created");
    });
});

module.exports = connect;