var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');
var dares = require('./routes/dares')
var expressLayouts = require('express-ejs-layouts')
var session = require('express-session');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // defaults to 'layout'

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts)

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONN_DAREGAME);

//require instragram node
var ig = require('instagram-node').instagram();

// Every call to `ig.use()` overrides the `client_id/client_secret`
// or `access_token` previously entered if they exist.
// ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });
ig.use({
  client_id: process.env.INSTAGRAM_ID,
    client_secret: process.env.INSTAGRAM_SECRET,
});

// added following three for sessions
app.use(cookieParser('S3CRE7'));
app.use(session({
  key: 'app.sess',
  // store: new RedisStore, //line commented out defaulst to RAM store, not production-ready, but simplest
  secret: 'ChangeMe' // change this to an environment variable after initial startup
}));


app.use('/', routes);
app.use('/users', users);
app.use('/dares', dares);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.get('/', function(req, res){
  res.render('welcome', { layout: 'welcome' })
})


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
