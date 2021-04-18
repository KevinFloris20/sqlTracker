USE employees;

INSERT into department(name)

VALUES ("workingClass"),("Bourgeoisie");

INSERT into role(title,salary,department_id)

VALUES ("manager",200000,2)
VALUES ("Accountant",15000,1)
VALUES ("Overseer", 12000, 1)
VALUES ("proletariat",8000,1)
VALUES ("lowerclass",5000,1)


INSERT into employee(first_name,last_name,role_id,manager_id)

VALUES("Scotworth","dollar",1,NULL)
VALUES("toby","MCquire",2,1)
VALUES("Worker","ONE",5,1)
VALUES("jess","TWO",4,1)
VALUES("rob","THREE",5,1)
VALUES("intern","FOUR",4,1)
VALUES("loser","FIVE",5,1)
VALUES("Camera","SIX",3,1)

