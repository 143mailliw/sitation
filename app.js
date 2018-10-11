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
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');
app.disable('view cache');

// setup mongoose
mongoose.connect(config.mongodb);

// database setup
var postSchema = new mongoose.Schema({ body: String, name: String, author: String, date: String });
var Post = mongoose.model('Post', postSchema);
var commentSchema = new mongoose.Schema({ body: String, author: String, date: String, postid: String });
var Comment = mongoose.model('Comment', commentSchema);
var pageSchema = new mongoose.Schema({ body: String, name: String, permreq: Number /*TODO: Implement Permission requirements for certain pages.*/ });
var Page = mongoose.model('Page', pageSchema);
var topbarSchema = new mongoose.Schema({ name: String, url: String, permreq: Number, /*TODO: Implement Permission requirements for certain pages.*/ });
var Topbar = mongoose.model('Topbar', topbarSchema);

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
var blogAdminAddBlogPostRouter = require('./routes/admin/blog/addblogpost');
var blogViewPostRouter = require('./routes/blog/viewpost');
var blogAdminEditPostRouter = require('./routes/admin/blog/editblogpost');
var blogDeletePostRouter = require('./routes/blog/deletepost');
var blogEditPostRouter = require('./routes/blog/editpost');
var blogAdminListPostRouter = require('./routes/admin/blog/listposts');
var blogDeleteCommentRouter = require('./routes/blog/deletecomment');
app.use('/admin/addblogpost', blogAdminAddBlogPostRouter);
app.use('/admin/editblogpost', blogAdminEditPostRouter);
app.use('/admin/listposts', blogAdminListPostRouter);
app.use('/processing/addpost', blogAddPostRouter);
app.use('/processing/addcomment', blogAddCommentRouter);
app.use('/processing/deletepost', blogDeletePostRouter);
app.use('/processing/deletecomment', blogDeleteCommentRouter);
app.use('/processing/editpost', blogEditPostRouter);
app.use('/viewpost', blogViewPostRouter);
// pages
var blogAddPageRouter = require('./routes/pages/addpage');
var blogAdminAddPageRouter = require('./routes/admin/pages/addpage');
var blogViewPageRouter = require('./routes/pages/viewpage');
var blogAdminEditPageRouter = require('./routes/admin/pages/editpage');
var blogDeletePageRouter = require('./routes/pages/deletepage');
var blogEditPageRouter = require('./routes/pages/editpage');
var blogAdminListPagesRouter = require('./routes/admin/pages/listpages');
app.use('/admin/addpage', blogAdminAddPageRouter);
app.use('/admin/editpage', blogAdminEditPageRouter);
app.use('/admin/listpages', blogAdminListPagesRouter);
app.use('/processing/addpage', blogAddPageRouter);
app.use('/processing/deletepage', blogDeletePageRouter);
app.use('/processing/editpage', blogEditPageRouter);
app.use('/viewpage', blogViewPageRouter);
// topbar
var blogAddTopbarRouter = require('./routes/topbar/addtopbar');
var blogAdminAddTopbarRouter = require('./routes/admin/topbar/addtopbar');
var blogDeleteTopbarRouter = require('./routes/topbar/deletetopbar');
var blogAdminListTopbarsRouter = require('./routes/admin/topbar/listtopbars');
app.use('/admin/addtopbar', blogAdminAddTopbarRouter);
app.use('/admin/listtopbars', blogAdminListTopbarsRouter);
app.use('/processing/addtopbar', blogAddTopbarRouter);
app.use('/processing/deletetopbar', blogDeleteTopbarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
  res.render('error' , { usersession: req.session.user, links: topbardata });
});

module.exports = app;
