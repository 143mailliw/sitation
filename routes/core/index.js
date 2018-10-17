var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
var Topbar = require('mongoose').model('Topbar');
/* GET home page. */
/* TODO: Add optional page index, instead of blog. */

router.get("/", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    Post.find({}, (err, posts) => {
        res.render('index', { posts: posts, usersession: req.session.user, links: topbardata })
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    return res.redirect('/');
})

module.exports = router;
