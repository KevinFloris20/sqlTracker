const mysql = require("mysql");
// const inquire = require("inquirer");
//const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Password123!",
    port:"3306",
    database:"employees",
})
connection.connect();

function findEmployees(){
    return connection.query(
    "SELECT * FROM employee "
    );
}
// module.exports = findEmployees();
findEmployees().then

async function viewEmployees(){
    const employees = await findEmployees();
    console.log(employees);
}
viewEmployees();

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
