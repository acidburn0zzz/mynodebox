/*
 * COOKIES for connected user
 */

/**
 * Get the connected user from the cookie
 */
exports.getConnectedUser = function(req, res, aCallback) {
    if (req.signedCookies.mynodeboxauth) {
        require("../drivers/" + req.app.get('dbconnexion').driver).getUserFromAuth(req.app.get('dbconnexion'), 
            req.signedCookies.mynodeboxauth, 
            function (ret) {
                var user = JSON.parse(ret);
                aCallback(user);
            }
        );
    } else {
        aCallback(null);
    }
};

/**
 * Set the cookie from the connected user
 */
exports.setConnectedUser = function(res, userid, keeplogin, aCallback) {
    var auth = makeSessionId(150);
    require("../drivers/" + res.app.get('dbconnexion').driver).saveAuth(res.app.get('dbconnexion'), 
        userid, auth, 
        function (ret) {
            var params = { signed: true, path: '/',  httpOnly: true };
            if (keeplogin == 'on') params.expires = new Date(new Date().getTime()+res.app.get("cookie_expire_delay")); 
            res.cookie('mynodeboxauth', auth, params);
            aCallback(ret);
        }
    );
};

/**
 * Generate an ID
 */
function makeSessionId(nb) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < nb; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}