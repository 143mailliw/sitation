var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');

router.get("/:id", (req, res) => {
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if ( req.session.user.permissionlvl === 255 ) {
        Post.deleteOne({_id: req.params.id }, (err, posts) => {
            res.redirect("/admin/listposts");
        });
    } else {
        res.status(403).send();
    }
});
module.exports = router;