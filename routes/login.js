/*
 * POST login user 
 */
 
/**
 * Login the user if db password and post password are OK
 */
exports.user = function(req, res) {
    // get the user from the db
    require("../drivers/" + req.app.get('dbconnexion').driver).getUser(req.app.get('dbconnexion'), req.body.login_login, function (ret) {
        var language = require('../cookies/language.js').getUserLanguage(req);
        var locale = require('../locale/' + (language ? language.locale : req.app.get('locale')) + '/locale.js');
        if (ret) {
            var user = JSON.parse(ret);
            // Load hash from your password DB.
            require('bcrypt').compare(req.body.login_password, user.password, function(err, valid) {
                if (err) console.log(err.toString());
                if (valid) {
                    // Set the connected user
                    require('../cookies/authentification.js').setConnectedUser(res, user.id, req.body.save_login, function (ret) {
                        res.redirect("/");
                    });       
                } else {
                    renderLoginError(req, res, locale);
                }
            });
        } else {
            renderLoginError(req, res, locale);
        }
    });
};

/**
 * Render the login error
 */
function renderLoginError(req, res, locale) {
    var language = require('../cookies/language.js').getUserLanguage(req);
    res.render('login', { 
        title: res.app.get('title'),
        subtitle: res.app.get('subtitle'),
        little_title: res.app.get('little_title'),
        locale: locale,
        login_message: locale.login.error,
        isLogged: false,
        language:  { 
            selected: (language ? language.language : req.app.get('language')),
            list: req.app.get('language.list'),
            code: (language ? language.locale : req.app.get('locale'))
        }
    });
}
