/// EXPORTS FUNCTIONS
/**
 * Save the user on to the DB
 * @param cnx Connexion to DB
 * @param user
 * @param aCallback
 */
exports.saveUser = function(cnx, user, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    console.log("saveUser");  
    redis.on("error", function (err) {
        console.log("saveUser: " + err);
        aCallback(null);
    }); 
    // Authentification
    redis.auth(cnx.password, function () {
        var key = "user:nextid";
        redis.incr(key, function(err, id) {
            if (err) console.log(err.toString());
            user.id = id;
            // start a separate multi command queue
            var multi = redis.multi();
            multi.set('user:id:' + user.id,  JSON.stringify(user));
            multi.set('user:email:' + user.email, user.id);
            multi.set('user:login:' + user.login, user.id);
            multi.rpush('list:users', user.id);
            // drains multi queue and runs atomically
            multi.exec(function (err, replies) {
                if (err) console.log(err.toString());
                console.log(replies); // 101, 2
                redis.quit();
                aCallback(user.id);
            });
        });
    });
};

/**
 * Get the user from the db from the login or the email
 * @param cnx Connexion to DB
 * @param user
 * @param aCallback
 */
exports.getUser = function(cnx, user, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    redis.on("error", function (err) {
        console.log("getUser: " + err);
        aCallback(null);
    }); 
    // Authentification
    redis.auth(cnx.password, function () {
        // Get a value
        var ret = null;
        redis.get('user:login:' + user, function (err, reply) {
            if (err) console.log(err.toString());
            if (reply) {
                var id = reply.toString();
                redis.get('user:id:' + id, function (err, reply) {
                    if (err) console.log(err.toString());
                    if (reply) ret = reply.toString();
                    redis.quit();
                    aCallback(ret);
                });
            } else {
                redis.get('user:email:' + user, function (err, reply) {
                    if (err) console.log(err.toString());
                    if (reply) {
                        var id = reply.toString();
                        redis.get('user:id:' + id, function (err, reply) {
                            if (err) console.log(err.toString());
                            if (reply) ret = reply.toString();
                            redis.quit();
                            aCallback(ret);
                        });
                    } else {
                        redis.quit();
                        aCallback(ret);
                    }
                });
            }
        });
    });
};

/**
 * Save the user Auth hash in the DB
 * @param cnx Connexion to DB
 * @param userid
 * @param auth
 * @param aCallback
 */
exports.saveAuth = function(cnx, userid, auth, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    redis.on("error", function (err) {
        console.log("saveAuth: " + err);
        aCallback(false);
    }); 
    // Authentification
    redis.auth(cnx.password, function () {
        getValue(redis, "user:" + userid + ":auth", function (ret) {
            // start a separate multi command queue
            var multi = redis.multi();
            if (ret) {
                multi.del("user:auth:" + ret);
            }
            multi.set("user:" + userid + ":auth", auth);
            multi.set("user:auth:" + auth, userid);
            // drains multi queue and runs atomically
            multi.exec(function (err, replies) {
                console.log(replies); // 101, 2
                redis.quit();
                aCallback(true);
            });
        });
    });
};

/**
 * Get the auth hash of the user from the id
 * @param cnx Connexion to DB
 * @param userid
 * @param aCallback
 */
exports.getAuthFromUserId = function(cnx, userid, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    redis.on("error", function (err) {
        console.log("getAuthFromUserId: " + err);
        aCallback(false);
    });
    // Authentification
    redis.auth(cnx.password, function () {
        // Get the user hash
        getValue(redis, "user:" + userid + ":auth", function (ret) {
            redis.quit();
            aCallback(true);
        });
    });
};

/**
 * Get the user from the auth hash
 * @param cnx Connexion to DB
 * @param auth
 * @param aCallback
 */
exports.getUserFromAuth = function(cnx, auth, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    redis.on("error", function (err) {
        console.log("getUserFromAuth: " + err);
        aCallback(null);
    });
    // Authentification
    redis.auth(cnx.password, function () {
        // Get the user
        getValue(redis, "user:auth:" + auth, function (id) {
            if (id) {
                getValue(redis, 'user:id:' + id, function (user) {
                    redis.quit();
                    aCallback(user);
                });
            } else {
                redis.quit();
                aCallback(null);
            }
        });
    }); 
};

/**
 * Check if the login exists in the DB
 * @param cnx Connexion to DB
 * @param login
 * @param aCallback
 */
exports.isLoginExists = function(cnx, login, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    redis.on("error", function (err) {
        console.log("isLoginExists: " + err);
        aCallback(null);
    });
    // Authentification
    redis.auth(cnx.password, function () {
        // If login exists
        redis.exists("user:login:" + login, function (err, exists) {
            redis.quit();
            aCallback(exists);
        });
    }); 
};

/**
 * Check if the email exists in the DB
 * @param cnx Connexion to DB
 * @param email
 * @param aCallback
 */
exports.isEmailExists = function(cnx, email, aCallback) {
    var redis = require("redis").createClient(cnx.port, cnx.host);
    redis.on("error", function (err) {
        console.log("isEmailExists: " + err);
        aCallback(null);
    });
    // Authentification
    redis.auth(cnx.password, function () {
        // If email exists
        redis.exists("user:email:" + email, function (err, exists) {
            redis.quit();
            aCallback(exists);
        });
    });
};

/// GLOBALS FUNCTIONS
/**
 * Get the next user id
 * TODO: delete the function, not use
 */
function getNextUserId(redis, aCallback) {
    var key = "user:nextid";
    redis.incr(key, function(err, id) {
        var userid = null;
        if (err) console.log(err.toString());
	    if (id) userid = id;
	    aCallback(userid);
    });
}

/**
 * Delete a value from the db
 */
function delValue(redis, key, aCallback) {
    // Get a value
    redis.del(key, function (err, reply) {
        var ret = true;
        if (reply) console.log(reply.toString());
        else ret = false;
        if (err) {
            console.log(err.toString());
            ret = false;
        }
        aCallback(ret);
    });
}

/**
 * Get a value from the DB
 */
function getValue(redis, key, aCallback) {
    // Get a value
    redis.get(key, function (err, reply) {
        var ret = null;
        if (reply) ret = reply.toString();
        if (err) console.log(err.toString());
        aCallback(ret);
    });
}

/**
 * Set a value in the DB
 */
function setValue(redis, key, value, aCallback) {
    // Set a value
    redis.set(key, value, function (err, reply) {
        var ret = true;
        if (reply) console.log(reply.toString());
        else ret = false;
        if (err) {
            console.log(err.toString());
            ret = false;
        }
        aCallback(ret);
    });
}
