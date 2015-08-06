/*
 * POST register user 
 */
 
/**
 * Register the user in the db
 */
exports.user = function(req, res) {
    var driver = require("../drivers/" + req.app.get('dbconnexion').driver);
    
    // Check if name, password, login, email are OK
    if (req.body.register_name === ''
            || req.body.register_password.length < 6 
            || !req.body.register_login.match(/^[A-Za-z0-9_\.\-]{6,50}$/) 
            || !req.body.register_email.match(/^([a-z0-9_\.\-]+)@([\da-z0-9\.\-]+)\.([a-z\.]{2,6})$/)) {
        res.redirect("/");
    }
    
    // Get the user from the post
    var language = require('../cookies/language.js').getUserLanguage(req);
    var userPost = {
        name: req.body.register_name,
        login: req.body.register_login,
        password: req.body.register_password,
        email: req.body.register_email,
        language: (language ? language : { language: req.app.get('language'), locale: req.app.get('locale')})
    };
    
    // Test if email already exists
    driver.isEmailExists(req.app.get('dbconnexion'), req.body.register_email, function (exists) {
        if (exists !== false) {
            res.redirect("/");
        } else {
            // Test if login already exists
            driver.isLoginExists(req.app.get('dbconnexion'), req.body.register_login, function (exists) {
                if (exists !== false) {
                    res.redirect("/");
                } else {
                    var bcrypt = require('bcrypt');
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(userPost.password, salt, function(err, hash) {
                            // Store hash in your password DB.
                            userPost.password = hash;
                            // Saving the user in the db
                            driver.saveUser(req.app.get('dbconnexion'), userPost, function (userid) {
                                // Set the connected user
                                require('../cookies/authentification.js').setConnectedUser(res, userid, false, function (ret) {
                                    res.redirect("/");
                                }); 
                            });
                        });
                    });
                }
            });
        }
    });
};