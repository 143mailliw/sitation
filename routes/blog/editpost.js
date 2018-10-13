var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Post = require('mongoose').model('Post');

router.post('/:id', (req, res) => {
    var date = new Date();
    var bodyText = req.body.body;
    var nameText = req.body.name;
    if (req.session.user.permissionlvl != 255) {
        res.status(403).send("Nice try.");
    }
    Post.updateOne({ _id: req.params.id }, { name: nameText, body: bodyText }, (err, post) => {
        res.redirect('/viewpost/' + req.params.id );
    }).catch(err => {
        res.status(400).send("Unable to save data" + err);
    });
});

module.exports = router;
