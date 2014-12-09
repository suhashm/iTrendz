/**
 * Created by suhas on 10/27/14.
 */
// config/passport.js


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });
    passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL

        },
        function(token, refreshToken, profile, done) {
            console.log(profile.displayName);
            var userOb = {};
            userOb.id = profile.id;
            userOb.email = profile.displayName;
            return done(null, userOb);
        }

    ))

};
