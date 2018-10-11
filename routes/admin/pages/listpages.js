var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
/* GET home page. */
router.get("/", (req, res) => {
    if(req.session.user.permissionlvl === 255) {
        if(req.session.user === undefined) {
            return res.status(403).send();
        }
        Post.find({}, (err, posts) => {
            res.render('listposts', { posts: posts, usersession: req.session.user })
        });
    } else {
        res.status(403).send();
    }

});
module.exports = router;
