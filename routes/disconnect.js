/*
 * GET disconnect 
 */
 
/**
 * Disconnect the user
 * TODO: need to remove the auth from the DB
 */
exports.user = function(req, res) {
  res.cookie('auth', '', {signed: true});
  res.redirect("/");
};