/*
 * GET home page.
 */
exports.index = function(req, res) {
    // Get the connected user
    require('../cookies/authentification.js').getConnectedUser(req, res, function (user) {
        var language;
        var isLogged = false;
    
        // If user exists, he is logged
        if (user) {
            language = user.language;
            isLogged = true;
        } else {
            language = require('../cookies/language.js').getUserLanguage(req);
        }
        var locale = require('../locale/' + (language ? language.locale : req.app.get('locale')) + '/locale.js');
        
        // Show the index page
        res.render('index', {
            title:  req.app.get('title'),
            subtitle:  req.app.get('subtitle'),
            little_title:  req.app.get('little_title'),
            locale: locale,
            isLogged: isLogged,
            messagelogged: (isLogged ? locale.header.hello : ""),
            username: (isLogged ? user.name : ""),
            language:  {
                selected: (language ? language.language : req.app.get('language')),
                list: req.app.get('language.list'),
                code: (language ? language.locale : req.app.get('locale'))
            }
        });
    });
};