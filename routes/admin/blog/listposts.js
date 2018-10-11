var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
var Topbar = require('mongoose').model('Topbar');
/* GET home page. */

var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
Topbar.find({}, (err, links) => {
    topbardata = links;
});

router.get("/", (req, res) => {
    if(req.session.user.permissionlvl === 255) {
        if(req.session.user === undefined) {
            return res.status(403).send();
        }
        Post.find({}, (err, posts) => {
            res.render('blog/listposts', { posts: posts, usersession: req.session.user, links: topbardata })
        });
    } else {
        res.status(403).send();
    }

});
module.exports = router;
