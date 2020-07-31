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
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Roles",
        "Exit"
      ]
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
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Roles":
          updateEmployeeRole();
          break;
        default:
          connection.end();
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM departments", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
}

function addDepartment(){
  inquirer.prompt([
    {
    name: "department",
    message: "What is the name of the department you would like to add?"
  }
]).then((answer) => {
  connection.query(`INSERT INTO departments (name) VALUES ('${answer.department}')`, (err) => {
    if (err) throw err;
    viewDepartments();
  })
})
}

function addRole(){
  inquirer.prompt([
    {
    name: "title",
    message: "What is the title of the role you would like to add?"
  },
  {
    name: "salary",
    message: "What is the annual salary of this role?"
  },
  {
    name: "department_id",
    message: "What is the departmental ID of this role?"
  }
]).then((answer) => {
  connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.department_id})`, (err) => {
    if (err) throw err;
    viewRoles();
  })
})
}

function addEmployee(){
  inquirer.prompt([
    {
    name: "first_name",
    message: "What is the employee's first name?"
  },
  {
    name: "last_name",
    message: "What is the employee's last name?"
  },
  {
    name: "role_id",
    message: "What is the role ID for this employee"
  },
  {
    name: "manager_id",
    message: "What is the manager's ID for this employee?"
  }
]).then((answer) => {
  connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', ${answer.role_id}, ${answer.manager_id})`, (err) => {
    if (err) throw err;
    viewEmployees();
  })
})
}

function updateEmployeeRole(){
  inquirer.prompt([
    {
      name: "first_name",
      message: "What is the first name of the employee you would like to change?"
    },
    {
      name: "last_name",
      message: "What is the last name of the employee you would like to change?"
    },
    {
      name: "role_id",
      message: "What would you like to change their role ID to?"
    }
  ]).then((answer) => {
    connection.query(`UPDATE employees SET role_id = ${answer.role_id} WHERE first_name = '${answer.first_name}' && last_name = '${answer.last_name}'`, (err) => {
      if (err) throw err;
      viewEmployees();
  })
  })
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as thread id: ${connection.threadId}`);
  start();
});
