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
});
connection.query = util.promisify(connection.query);



//----------------These commands get table info from the sql---------------------
async function findDepartments(){
    const responce = await connection.query(
        "SELECT * FROM department"
    );
    console.log(" ");
    console.log("Current departments:");
    for(var x = 0; x < responce.length; x++){
        console.log(responce[x].name);
    }
}

async function findRoles(){
    const responce = await connection.query(
        "SELECT * FROM role"
    );
    console.log(" ");
    console.log("Current roles/salary:");
    for(var x = 0; x < responce.length; x++){
        console.log(responce[x].title,"/",responce[x].salary);
    }
}

async function findEmployees(){
    const responce = await connection.query(
    "SELECT first_name,last_name FROM employee;"
    );
    console.log(" ");
    console.log("Employee's name (first/last):")
    for(var x = 0; x < responce.length; x++){
        console.log(responce[x].first_name," ",responce[x].last_name);
    }

}

async function viewSQLData(){
    findDepartments();
    findRoles();
    findEmployees();
}
//-------------------------------------------------end------------------------------
viewSQLData();
//MAKE INQUIRER




//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'