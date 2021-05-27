const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
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
    setTimeout(()=>{inquireStart();},1000);
}
//-------------------------------------------------end------------------------------








//------------------this adds new Employee to sql--------------------------------------
function inquireEmployeeAdd(){
    let firstName = "";
    let lastName = "";
    let role = 0;
    let department = 0;
    let output = "";

    //Validate input role
    async function RoleValidation(answer){
        const responceRole = await connection.query(
            "SELECT * FROM role"
        );
        for(var x = 0; x < responceRole.length; x++){
            if(answer.role == responceRole[x].title){
                role = x++;
                AskDepartment();
            }
            else if(x == responceRole.length){
                console.log("Invalid role. Please try again:");
                AskRole();
            }
        }
    }

    //Validate input department 
    async function DepartmentValidation(answer){
        const responceDep = await connection.query(
            "SELECT * FROM department"
        );
        for(var y = 0; y < responceDep.length; y++){
            if(answer.dep == responceDep[y].name){
                department = y++;
                done();
            }
            else if(y == responceDep.length--){
                console.log("Invalid Department, Please try again:")
                AskDepartment();
            }
        }
    }

    //inquire
    inquirer
        .prompt([
            {
                type: "input",
                name: "namefirst",
                message: "What is the new employees first name?:",
            },
            {
                type: "input",
                name: "namelast",
                message: "What is their last name?:",
            },

        ]).then(answer=>{
            firstName = answer.namefirst;
            lastName = answer.namelast;
            AskRole();
        });
    
    const AskRole = ()=>{
        console.log("Current roles:");
        findRoles();
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "role",
                    message: "Choose a role:"
                }
            ]).then(answer=>{
                RoleValidation(answer);
            })
    } 

    const AskDepartment = ()=>{
        console.log("Current Departments:");
        findDepartments();
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "dep",
                    message: "Choose a department:"
                }
            ]).then(answer=>{
                DepartmentValidation(answer);
            })

    } 

    const done = ()=>{
        console.log("All done :), Updating System...");
        output = "INSERT into employee(first_name,last_name,role_id,manager_id)\
                 VALUES"+' ("'+firstName+'","'+lastName+'",'+department+","+role+");";
        return connection.query(output),viewSQLData();
    } 
}
//-----------------------------end--------------------------------------------------







//------------------------------Delete Employee info-----------------------
function deleteEmployee(){
    findEmployees();

    inquirer
    .prompt([
        {
            type:"input",
            name:"input",
            message:"Choose an employee to delete(enter last name):"
        }
    ]).then(answer=>{
        deleteValidation(answer);
    })
    
    async function deleteValidation(answer){
        const responce = await connection.query(
            "SELECT last_name FROM employee;"
        );
        var num = responce.length
        console.log(responce[8].last_name);
        console.log(responce.length)
        console.log(answer.input)
        for(var y = 0; y < num; y++){
            console.log(y)
            if(answer.input === responce[y].last_name){
                console.log("yo")
                deleteEmployees(answer.input);
            }
            else if(y == responce.length--){
                console.log("Invalid Employee, Please try again:")
                deleteEmployee();
            }
        }
    }

    async function deleteEmployees(employee){
        console.log("Employee successfully deleted!\nRebooting...")
        await connection.query(
            "DELETE FROM employee WHERE last_name='"+employee+"'"
        );
        inquireStart()
    }

}

//----------------------------------end---------------------------

viewSQLData();

    
//INQUIRER
async function inquireStart(){
    console.log("\n\nWelcome to the CMS!")
    console.log("Type in any of these commands to get started:\nAddEmployee\nUpdateEmployee\nDeleteEmployee\nAddDepartment\nRoleAdd");
    inquirer 
        .prompt([
            {
                type: "input",
                name: "input"
            },
        ]).then(answer =>{
            if(answer.input == "AddEmployee"){
                return inquireEmployeeAdd();
            }
            else if(answer.input == "UpdateEmployee"){
                return deleteEmployee(),InquireEmployeeAdd();
            }
            else if(answer.input == "DeleteEmployee"){
                return deleteEmployee();
            }
            console.log("Invalid input try again")
            return inquireStart();
        })

}

// function inquireEmployeeAdd(){
//     inquirer 
//         .prompt([
//             {
//                 type: "input",
//                 name: "FirstName",
//                 message: "Enter employees first name: ",
//             },
//             {
//                 type: "input",
//                 name: "LastName",
//                 message: "Enter employees last name: "
//             },
//             {
//                 type: "input",
//                 name: "role",
//                 message: findRoles()+"\nEnter one of the listed roles: ",
//             }
//         ])
// }


//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'