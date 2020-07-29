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
  inquirer
    .prompt({
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
    })
    .then((ans) => {
      console.log(ans);
      switch (ans.action) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Department":
        case "Add Role":
        case "Add Employee":
        case "Update Employee Roles":
          console.log("We did it!");
          connection.end();
          break;
        default:
          console.log("U suck.");
          connection.end();
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM departments", (err, data) => {
    if (err) throw err;
    console.log(data);
    start();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", (err, data) => {
    if (err) throw err;
    console.log(data);
    start();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", (err, data) => {
    if (err) throw err;
    console.log(data);
    start();
  });
}
//! NEED TO ADD SEED DATA TO TEST THESE
//! ADD TABLE THING SARAH SENT OUT IN SLACK

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as thread id: ${connection.threadId}`);
  start();
});
