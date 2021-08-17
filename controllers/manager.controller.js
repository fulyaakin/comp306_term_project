const fs = require('fs');

exports.getManagerPage = (req, res) => {
        res.render('manager.ejs', {
            title: "Welcome to GYM306 | Manager Insights",
        });
};

exports.getTotalNumbers = (req, res) => {
    let query = "SELECT count(distinct member.member_id) as total_member,count(distinct employee.employee_id) as total_employee,count(distinct lesson.lesson_id) as total_lesson FROM gym.member, gym.employee, gym.lesson"; 

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/totalNumbers');
        }

        res.render('total-numbers.ejs', {
            title: "Welcome to GYM306 | Total Numbers",
            numbers: result
        });
    });
};

exports.getActiveMembers = (req, res) => {
    let query = "SELECT CONCAT(m.first_name, ' ', m.last_name) as member_name, m.birth_Date, COUNT(en.lesson_ID) as enrolled_class_no FROM gym.member as m inner join gym.enroll as en on m.member_ID = en.member_ID GROUP BY m.member_ID HAVING m.birth_Date <  '1971-01-01' ORDER BY enrolled_class_no DESC"; 

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/activeMembers');
        }

        res.render('active-members.ejs', {
            title: "Welcome to GYM306 | Oldest Active Members",
            active_members: result
        });
    });
};

exports.getBestTrainer = (req, res) => {
    let query = "SELECT Lesson.employee_id, Lesson.lesson_name, Employee.first_Name, Employee.last_Name FROM gym306.Lesson join gym306.employee on employee.Employee_id=Lesson.employee_id WHERE lesson.employee_id=( select lesson.employee_id from gym306.Lesson group by Lesson.employee_id order by count(lesson.lesson_id) desc limit 1)"; 

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/bestTrainer');
        }

        res.render('best-trainer.ejs', {
            title: "Welcome to GYM306 | Lessons of the Best Trainer ",
            best_trainer: result
        });
    });
};

exports.getYoungestMembers = (req, res) => {
    let query1="SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));"
    let query = "SELECT gym306.ENROLL.lesson_id, first_Name, last_Name, MAX(birth_date) as mbd FROM gym306.MEMBER, gym306.LESSON, gym306.ENROLL WHERE MEMBER.member_ID = ENROLL.member_ID AND LESSON.lesson_ID = ENROLL.lesson_ID GROUP BY ENROLL.lesson_id HAVING COUNT(*)>1";
    
    db.query(query1);
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/youngestMembers');
        }

        res.render('youngest-member.ejs', {
            title: "Welcome to GYM306 | Youngest Member of each Class",
            youngest_members: result
        });
    });
};

exports.getSeniorTrainers = (req, res) => {
    let query = "Select e.first_name , e.last_name, e.salary from Employee as e inner join trainer as t on e.employee_ID = t.employee_ID WHERE e.salary >= (SELECT AVG(e.salary) from Employee as e inner join trainer as t on e.employee_ID = t.employee_ID) ORDER BY e.salary desc";
    
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/seniorTrainers');
        }

        res.render('senior-trainers.ejs', {
            title: "Welcome to GYM306 | Senior Trainers",
            senior_trainers: result
        });
    });
};

exports.getPrivateAndGroupTrainers = (req, res) => {
    let query = "SELECT distinct lesson.employee_ID as eid, employee.first_Name, employee.last_Name FROM LESSON, employee WHERE employee.employee_id=lesson.employee_id and EXISTS (SELECT * FROM gym306.PRIVATE_LESSON WHERE LESSON.lesson_ID=PRIVATE_LESSON.lesson_ID) and EXISTS (SELECT distinct employee_ID FROM   gym306.LESSON WHERE EXISTS (SELECT * FROM gym306.GROUP_LESSON WHERE LESSON.lesson_ID=GROUP_LESSON.lesson_ID))";
    
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/private_group_trainers');
        }

        res.render('private-group-trainers.ejs', {
            title: "Welcome to GYM306 | Private and Group Lessons Trainers",
            private_group_trainers: result
        });
    });
};
