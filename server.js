// require our dependencies
var express = require('express'),
	app = express(),
	port = 4000,
	mongoose = require('mongoose'),
	models = require('./app/models/models'),
	bodyParser = require('body-parser');
var passport = require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());

// load passport strategies
var localSignupStrategy = require('./app/passport/local-signup');
var localLoginStrategy = require('./app/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

//Middleware used to show all HTTP request info to the server
app.use(function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// pass the authenticaion checker middleware
var authCheckMiddleware = require('./app/middleware/auth-check');
app.use('/', authCheckMiddleware);

//Require our routes and set the app to use them
var posts = require('./app/routes/postRoutes');
var comments = require('./app/routes/commentRoutes');
var applications = require('./app/routes/applicationRoutes');
var auth = require('./app/routes/authRoutes');
var api = require('./app/routes/api');
var reddit = require('./app/routes/redditRoutes');

posts(app);
comments(app);
applications(app);
auth(app);
reddit(app);

app.use('/api', api);

//Sends a 404 not found error if the requested URL does not match any API request
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'});
});

// start the server
var server = app.listen(port, function() {
	console.log('Server listening on http://%s:%s', server.address().address, server.address().port);
});
