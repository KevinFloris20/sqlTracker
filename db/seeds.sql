USE employees;

INSERT into department(name)

VALUES ("Bourgeoisie"),("workingClass");

INSERT into role(title,salary,department_id)

VALUES
("manager",200000,2), 
("Accountant",15000,1), 
("Overseer", 12000, 1), 
("proletariat",8000,1),
("lowerclass",5000,1);


INSERT into employee(first_name,last_name,role_id,manager_id)

VALUES
("Scotworth","dollar",1,NULL), 
("toby","MCquire",2,1),
("Worker","ONE",5,1),
("jess","TWO",4,1),
("rob","THREE",5,1),
("intern","FOUR",4,1),
("loser","FIVE",5,1),
("Camera","SIX",3,1);