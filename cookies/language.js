/**
 * COOKIES for language choose
 */
 
/**
 * Get the user language
 */
exports.getUserLanguage = function(req) {
    if (req.signedCookies.mynodeboxlang) {
        return req.signedCookies.mynodeboxlang;
    }
    return null;
};

/**
 * Set the user language
 */
exports.setUserLanguage = function(res, language) {
    var params = { signed: true, path: '/',  httpOnly: true, expires: new Date(new Date().getTime()+res.app.get("cookie_expire_delay")) };
    res.cookie('mynodeboxlang', language, params);
    return true
};