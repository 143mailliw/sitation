var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');
var Topbar = require('mongoose').model('Topbar');

var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
Topbar.find({}, (err, links) => {
    topbardata = links;
});

/* GET blog page. */
router.get("/:id", (req, res) => {
    var commentdata = new Comment({body:"Whoops! We did a fucksy wucksy. The comment system is broken!", name: "System", date:"Now"});
    Comment.find({postid: req.params.id}, (err, comments) => {
        commentdata = comments;
    });
    Post.findById({_id: req.params.id }, (err, posts) => {
        res.status(200).render('blog/viewpost', { post: posts, usersession: req.session.user, comments: commentdata, links: topbardata })
    });
});
module.exports = router;