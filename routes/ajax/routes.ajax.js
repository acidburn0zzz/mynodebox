
/**
 * Check if email exists
 */
exports.isemailexists = function(req, res) {
    require("../../drivers/" + req.app.get('dbconnexion').driver).isEmailExists(req.app.get('dbconnexion'), 
        req.body.email, 
        function (exists) {
            res.send({ exists: exists });
        }
    );
};

/**
 * Check if login exists
 */
exports.isloginexists = function(req, res) {
    require("../../drivers/" + req.app.get('dbconnexion').driver).isLoginExists(req.app.get('dbconnexion'), 
        req.body.login, 
        function (exists) {
            res.send({ exists: exists });
        }
    );
};