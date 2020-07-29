const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "company",
});

function start() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View Departments",
      "View Roles",
      "View Employees",
      "Update Employee Roles",
    ],
  }).then((ans) => {
      console.log(ans);
    switch(ans.action){
        case "Add Department":
        case "Add Role":
        case "Add Employee":
        case "View Departments":
        case "View Roles":
        case "View Employees":
        case "Update Employee Roles":
            console.log("We did it!")
            connection.end();
            break;
        default:
            console.log("U suck.")
            connection.end();
    }
  })
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as thread id: ${connection.threadId}`);
  start();
});
