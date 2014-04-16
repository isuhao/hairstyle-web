var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var orm = require('orm');

//router
var routes = require('./routes');
var users = require('./routes/user');

var app = express();

//mysql opts
var opts = {
database : "hairstyle",
		   protocol : "mysql",
		   host     : "127.0.0.1",
		   port     : 3306,
		   user     : "root",
		   password : "letmein",
		   query    : {
				pool     : true,
		  	    debug    : true
		   }
}

app.use(orm.express(opts,{
	define:function(db, models) {
		models.user = db.define('USER',
		{
			username : String,
			password : String,
			nickname : String
		},
		{
			id : 'id'
		});
}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/user/:uid', users.getUserById);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
