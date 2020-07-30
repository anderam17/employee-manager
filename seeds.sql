INSERT INTO departments(name)
VALUES ("engineering"),("sales"),("finance"),("legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("engineer", 70000, 10),("lead engineer", 90000, 11),("lawyer", 70000, 20),("lead lawyer", 90000, 21), ("salesperson", 60000, 30), ("lead salesperson", 70000, 31), ("financial advisor", 70000, 40) ("lead financial advisor", 90000, 41);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Allana", "Anderson", 10, 2), ("Daniel", "Lee", 11, 1), ("Katlin", "Fletcher", 20, 3), ("KC", "Katalbas", 21, 4), ("Betsy", "Shuttleworth", 30, 5), ("Maia", "Holmes", 31, 6), ("Anthony", "Cortes", 40, 7), ("Willie", "Pointsalot", 41, 8);


SELECT * FROM company;