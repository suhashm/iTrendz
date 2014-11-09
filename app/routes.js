/**
 * Created by suhas on 10/27/14.
 */
// app/routes.js
module.exports = function(app, passport) {
//module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('events.ejs', {
            user : req.user // get the user out of session and pass to template
            //user : req // get the user out of session and pass to template
        });
    });
    app.get('/guest',function(req, res) {
        res.render('events.ejs');
    });
    app.get('/intro',function(req, res) {
        res.render('intro1.ejs');
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/intro',
            failureRedirect : '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


