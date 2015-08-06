/*
 * GET language page.
 */
exports.change = function(req, res) {
    if (req.app.get('language.list').indexOf(req.params.language) !== -1) {
        require('../cookies/language.js').setUserLanguage(res, { language: req.params.language, locale: req.app.get('locale.list')[req.app.get('language.list').indexOf(req.params.language)]});
    }
    res.redirect("/");
}