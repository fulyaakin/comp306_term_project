const fs = require('fs');

exports.getEmployeePage = (req, res) => {
    let query = "SELECT * FROM EMPLOYEE"; // query database to get all the lessons

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/employees');
        }

        res.render('employees.ejs', {
            title: "Welcome to GYM306 | View Employees",
            employees: result
        });
    });
};

exports.getTrainerPage = (req, res) => {
    let query = "SELECT Trainer.employee_id as trainer_id, Lesson.lesson_id as lesson_id, employee.first_Name as trainer_first_Name, employee.last_Name as trainer_last_Name FROM gym.EMPLOYEE, gym.Trainer, gym.Lesson where Trainer.employee_id=Employee.employee_id and Trainer.employee_id=Lesson.employee_id"; 

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/trainers');
        }

        res.render('trainers.ejs', {
            title: "Welcome to GYM306 | View Trainers",
            trainers: result
        });
    });
};