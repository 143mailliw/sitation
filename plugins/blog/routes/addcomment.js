var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = require('mongoose').model('Comment');

router.post('/:postid', (req, res) => {
    var date = new Date();
    var bodyText = req.body.body;
    var authorText = req.session.user.username;
    var dateText = date.toISOString().slice(0,10);
    var postData = new Comment({body: bodyText, author: authorText, date: dateText, postid: req.params.postid});
    postData.save().then( result => {
        res.redirect('/viewpost/' + req.params.postid);
    }).catch(err => {
        res.status(500).send("Unable to save data" + err);
    });
});

module.exports = router;
