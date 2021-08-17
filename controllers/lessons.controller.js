const fs = require('fs');

exports.getLessonsPage = (req, res) => {
    let query = "SELECT lesson.lesson_id as lesson_id,lesson.lesson_name as lesson_name, employee.first_Name as trainer_first_Name, employee.last_Name as trainer_last_Name,lesson.duration, lesson.day, lesson.time FROM LESSON INNER JOIN EMPLOYEE ON LESSON.employee_id=EMPLOYEE.employee_id"; // query database to get all the lessons

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/lessons');
        }

        res.render('lessons.ejs', {
            title: "Welcome to GYM306 | View Lessons",
            lessons: result
        });
    });
};

exports.getPrivateLessonsPage = (req, res) => {
    let query1="SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));"
    let query = "SELECT lesson.lesson_id ,lesson.lesson_name , employee.first_Name as efn, employee.last_Name as eln, lesson.duration,lesson.day, lesson.time,  member.first_Name, member.last_Name FROM gym306.LESSON  INNER JOIN gym306.EMPLOYEE ON LESSON.employee_id=EMPLOYEE.employee_id inner join gym306.private_lesson on private_lesson.lesson_id=lesson.lesson_id join gym.member on member.member_id=private_lesson.member_id group by lesson.lesson_id;"
    // execute query
    db.query(query1);
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/privateLesson');
        }

        res.render('private-lessons.ejs', {
            title: "Welcome to GYM306 | View Private Lessons",
            privateLessons: result
        });
    });
};

exports.getGroupLessonsPage = (req, res) => {
    let query = "SELECT lesson.lesson_id ,lesson.lesson_name ,lesson.duration, lesson.day,lesson.time, employee.first_Name, employee.last_Name FROM gym306.LESSON INNER JOIN gym306.EMPLOYEE ON LESSON.employee_id=EMPLOYEE.employee_id inner join gym306.group_lesson on group_lesson.lesson_id=lesson.lesson_id;"; 

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/groupLesson');
        }

        res.render('group-lessons.ejs', {
            title: "Welcome to GYM306 | View Group Lessons",
            groupLessons: result
        });
    });
};
