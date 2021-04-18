const mysql = require("mysql");
const util = require("util");

// const inquire = require("inquirer");
//const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Password123!",
    port:"3306",
    database:"employees",
})
connection.connect((err)=>{
    if(err)throw err;
    findEmployees();
});
connection.query = util.promisify(connection.query);


async function findEmployees(){
    const responce = await connection.query(
    "SELECT * FROM department;");
    console.log(responce);
    return responce;
}
// module.exports = findEmployees();
// findEmployees().then

async function viewEmployees(){
    const employees = await findEmployees();
    console.log(employees);
}
// viewEmployees();

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'