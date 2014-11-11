/**
 * Created by suhas on 10/26/14.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

//var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//var configDB = require('./config/database.js');
 require('./config/passport')(passport); //
// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
//app.set('views', __dirname+'/views');
//app.engine('html', require('ejs').renderFile);
// required for passport
app.use(express.static(__dirname + "/views"));
app.use(session({ secret: 'itrenzitrendzitrendz' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
