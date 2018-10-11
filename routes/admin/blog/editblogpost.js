var express = require('express');
var session = require('express-session');
var config = require('../../../config');
var User = require('../../../lib/user');
var crypto = require('crypto');
var router = express.Router();
var Post = require('mongoose').model('Post');
var Topbar = require('mongoose').model('Topbar');

var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
Topbar.find({}, (err, links) => {
    topbardata = links;
});

router.get('/:id', function(req, res) {
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if(req.session.user.permissionlvl === 255) {
        Post.findById({_id: req.params.id}, (err, posts) => {
            return res.status(200).res.render('blog/editblogpost', {post: posts, usersession: req.session.user, links: topbardata});
        });
    } else {
        return res.status(403).send();
    }
})

module.exports = router;