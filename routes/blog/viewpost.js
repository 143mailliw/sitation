var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');

/* GET blog page. */
router.get("/:id", (req, res) => {
    var commentdata = new Comment({body:"Whoops! We did a fucksy wucksy. The comment system is broken!", name: "System", date:"Now"});
    Comment.find({postid: req.params.id}, (err, comments) => {
        commentdata = comments;
        console.log(commentdata);
        console.log(comments);
    });
    Post.findById({_id: req.params.id }, (err, posts) => {
        res.render('viewpost', { post: posts, usersession: req.session.user, comments: commentdata })
    });
});
module.exports = router;