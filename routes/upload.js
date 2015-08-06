
/*
 * POST upload file 
 */


/**
 * 
 */
exports.file = function(req, res) {
  var fs = require("fs")
     , driver = require("../redis/driver");
     
  fs.readFile(req.files.uploadFile.path, function (err, data) {
    // ...
    var newPath = req.app.get("uploadFolder") + req.files.uploadFile.name;
    fs.writeFile(newPath, data, function (err) {
      var userArray = [];

      driver.readRedis("global", function (value) {
          if (value) userArray = value.split(',');
      });
      userArray.push(req.files.uploadFile.name);
      driver.insertRedis("global", userArray.join(','));
        
      res.redirect("back");
    });
  });
};

/**
 *
 */
function makeid(nb) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < nb; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}