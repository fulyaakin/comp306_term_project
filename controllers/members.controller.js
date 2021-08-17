const fs = require('fs');
exports.getMembersPage = (req, res) => {
    let query = "SELECT * FROM MEMBER"; // query database to get all the members

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/members');
        }

        res.render('members.ejs', {
            title: "Welcome to GYM306 | View Members",
            members: result
        });
    });
};

exports.addMemberPage = (req, res) => {
    res.render('add-member.ejs', {
        title: "Welcome to GYM306 | Add a new member",
        message: ''
    });
};

exports.addMember = (req, res) => {
    let message = '';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let address = req.body.address;
    let birth_date = req.body.birth_date;
    let sex = req.body.sex;
    let member_id = req.body.member_id;

    let userQuery = "SELECT * FROM MEMBER WHERE member_id = '" + member_id + "'";

    db.query(userQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Member already exists';
            res.render('add-member.ejs', {
                message,
                title: "Welcome to GYM306 | Add a new member"
            });
        } else {
                    // send the member's details to the database
                    let query = "INSERT INTO MEMBER (first_name, last_name, address, birth_date, sex, member_id) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + address + "', '" + birth_date + "', '" + sex + "', '" + member_id + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                
            
        }
    });
}

exports.deleteMember = (req, res) => {
    let memberID = req.params.id;
    let deleteUserQuery = 'DELETE FROM MEMBER WHERE member_id ='+ memberID+'';

    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/members');
    });
}

exports.getEnrollments = (req, res) => {
    let query = "SELECT member.member_id, member.first_Name , member.last_Name, enroll.lesson_id FROM gym.member inner join gym.enroll on enroll.member_id=member.member_id"; 

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/enrollments');
        }

        res.render('enrollments.ejs', {
            title: "Welcome to GYM306 | View Enrollments",
            enrollments: result
        });
    });
}