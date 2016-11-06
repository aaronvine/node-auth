//init
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

//config
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'chooseasecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes.js')(app, passport);

//launch
app.listen(port);
console.log('listening on port ', port);
