
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , upload = require('./routes/upload')
  , ajax = require('./routes/ajax/routes.ajax')
  , register = require('./routes/register')
  , login = require('./routes/login')
  , lang = require('./routes/changelanguage')
  , disconnect = require('./routes/disconnect')
  , download = require('./routes/download')
  , http = require('http')
  , path = require('path')
  , dbconfdev = require('./config/db.conf.dev.js')
  , appconf = require('./config/app.conf.js');

var app = express();

/**
 * App global configuration
 */ 
app.configure(function(){
  app.set('host', process.env.IP);
  app.set('port', process.env.PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('title', appconf.title);
  app.set('subtitle', appconf.subtitle);
  app.set('little_title', appconf.little_title);
  app.set('locale', appconf.locale);
  app.set('language', appconf.language);
  app.set('language.list', appconf.language_list);
  app.set('locale.list', appconf.locale_list);
  app.set('uploadFolder', appconf.uploadFolder);
  app.set('cookie_expire_delay', appconf.cookie_expire_delay);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(appconf.secret_cookie));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

/**
 * App development env
 */
app.configure('development', function() {
  app.use(express.errorHandler());
  app.set('dbconnexion', {
      driver: dbconfdev.driver,
      host: dbconfdev.host,
      port: dbconfdev.post,
      user: dbconfdev.user,
      password: dbconfdev.password
  });
});

// GET
app.get('/', routes.index);
app.get('/register', routes.index);
app.get('/download/:file', download.file);
app.get('/disconnect', disconnect.user);
app.get('/lang/:language', lang.change);

// POST
app.post('/upload', upload.file);
app.post('/login', login.user);
app.post('/register', register.user);

// Ajax POST
app.post('/ajax/isemailexists', ajax.isemailexists);
app.post('/ajax/isloginexists', ajax.isloginexists);

// Run the NodeJS server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
