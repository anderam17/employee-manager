const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employees"
});


connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as thread id: ${connection.threadId}`);
    start();
  });