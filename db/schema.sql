DROP DATABASE IF EXISTS employees;
CREATE database employees;
USE employees;

CREATE TABLE employee(
    id int auto_increment PRIMARY KEY
    first_name varchar(30);
    last_name varchar(30);
    role_id int  FOREIGN KEY REFERENCES role (id)
    manager_id int FOREIGN KEY REFERENCES employee (id)
)

CREATE TABLE role (
    id int auto_increment PRIMARY KEY
    title varchar(30)
    salary DECIMAL
    department_id int FOREIGN KEY REFERENCES department (id)
)

CREATE TABLE department(
    id int auto_increment PRIMARY KEY
    name varchar(30)
)