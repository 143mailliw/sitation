var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
/* GET blog page. */
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    Post.findById({_id: req.params.id}, (err, posts) => {
        console.log(posts.name);
        res.render('viewpost', { post: posts, usersession: req.session.user })
    });
});
module.exports = router;