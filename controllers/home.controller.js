const fs = require('fs');

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM MEMBER"; // query database to get all the members

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index.ejs', {
            title: "Welcome to GYM306 | View Members",
            members: result
        });
    });
};
