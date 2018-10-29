// package requirements
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
const fs = require('fs');

// local requirements
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());
fs.access("config.js", fs.constants.F_OK, (err) => {
    if (err) {
        app.use("/", require("./routes/setup.js"));
        app.listen(3000, function() {
            console.log("Listening on 3000");
        });
    } else {
        // initial db setup
        var config = require('./config.js');
        mongoose.connect(config.mongodb, { useNewUrlParser: true});

        // session setup
        app.use(session({
            secret: config.sessionsecret,
            resave: false,
            saveUninitialized: true
        }));

        app.use(function(req, res, next) {
            res.locals.user = req.session.user;
            res.locals.config = config;
            next();
        });

//plugin setup
        var currentRequire = "what_broke_this_time";
        const directoryPath = './plugins';
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                console.log('Found Plugin: ' + file);
                currentRequire = require('./plugins/' + file + "/main.js");
                currentRequire.databaseSetup();
            });
            files.forEach(function (file) {
                currentRequire = require('./plugins/' + file + "/main.js");
                currentRequire.information.routes.forEach(function(value) {
                    app.use(value.route, require("./plugins/" + file + "/routes/" + value.router));
                });
            });
            files.forEach(function (file) {
                currentRequire = require('./plugins/' + file + "/main.js");
                currentRequire.setup();
            });

            var Topbar = require('mongoose').model('Topbar');

            // catch 404 and forward to error handler
            app.use(function(req, res, next) {
                var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
                Topbar.find({}, (err, links) => {
                    topbardata = links;
                });
                res.render('errorpage/404', { usersession: req.session.user, links: topbardata });
            });

            // error handler
            app.use(function(err, req, res, next) {
                var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
                Topbar.find({}, (err, links) => {
                    topbardata = links;
                });

                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error page
                res.status(err.status || 500);
                res.render('errorpage/500' , { usersession: req.session.user, links: topbardata });
            });
            var port = process.env.PORT || config.port;
            app.listen(port, function() {
                console.log("Listening on " + port);
            });
        });
    }
});
