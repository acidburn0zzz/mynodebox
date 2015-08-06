
/*
 * GET download page.
 */

exports.file = function(req, res){
  res.render('index', { title: 'Uploader' });
};