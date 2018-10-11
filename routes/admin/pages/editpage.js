var express = require('express');
var session = require('express-session');
var config = require('../../config');
var User = require('../../lib/user');
var crypto = require('crypto');
var router = express.Router();
var Post = require('mongoose').model('Post');

router.get('/:id', function(req, res) {
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if(req.session.user.permissionlvl === 255) {
        Post.findById({_id: req.params.id}, (err, posts) => {
            return res.render('editblogpost', {post: posts, usersession: req.session.user});
        });
    } else {
        return res.status(403).send();
    }
})

module.exports = router;