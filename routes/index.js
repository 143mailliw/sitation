var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
/* GET home page. */
router.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { posts: posts, usersession: req.session.user })
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    return res.redirect('/');
})

module.exports = router;
