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
var config = require('./config');

// local requirements

console.log(config)
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup mongoose
mongoose.connect(config.mongodb);

// blogsetup
var postSchema = new mongoose.Schema({ body: String, name: String, author: String, date: String });
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
var commentSchema = new mongoose.Schema({ body: String, author: String, date: String, postid: String });
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

// parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());

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

// router
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
// users system
var usersUsersRouter = require('./routes/users/users');
var usersRegisterRouter = require('./routes/users/register');
var usersLoginRouter = require('./routes/users/login');
app.use('/login', usersLoginRouter);
app.use('/register', usersRegisterRouter);
app.use('/users', usersUsersRouter);
// blog
var blogAddPostRouter = require('./routes/blog/addpost');
var blogAddCommentRouter = require('./routes/blog/addcomment');
var blogAdminAddBlogPost = require('./routes/admin/addblogpost');
var blogViewPost = require('./routes/blog/viewpost');
app.use('/admin/addblogpost', blogAdminAddBlogPost);
app.use('/processing/addpost', blogAddPostRouter);
app.use('/viewpost', blogViewPost);
app.use('/processing/addcomment', blogAddCommentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
