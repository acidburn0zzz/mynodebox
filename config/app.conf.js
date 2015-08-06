// Configuration of the NodeJS application

// -- Title configuration part
// The application title
exports.title = 'MyNodeBox';
// The application subtitle
exports.subtitle = 'Welcome, in the upload world ! Beta';
// The applicaiton short title
exports.little_title = 'MyNodeBox';


// -- Language configuration part, if you want a multilanguage application
// Default locale used for loading the good language part
exports.locale = 'en_US';

// Default language selection
exports.language = 'english';

// List of supported languages
exports.language_list = [ 'English', 'Français' ];

// List of associed locale, index of locale must be the same index or the language in language_list
// Ex: language_list english index = 0 = locale_list en_US index
exports.locale_list = [ 'en_US', 'fr_FR' ];


// -- Upload configuration part
// Upload folder
exports.uploadFolder = './uploads';


// -- Cookie configuration part
// Secret for the secure cookie encryption
exports.secret_cookie = 'MyNodeBox';

// Delay before long cookie expires
exports.cookie_expire_delay = 1000*60*60*24*20; // 20 days





