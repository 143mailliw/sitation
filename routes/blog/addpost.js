var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Post = require('mongoose').model('Post');

router.post('/', (req, res) => {
    var date = new Date();
    var bodyText = req.body.body;
    var nameText = req.body.name;
    var authorText = req.session.user.username;
    var dateText = date.toISOString().slice(0,10);
    var postData = new Post({body: bodyText, name: nameText, author: authorText, date: dateText});
    if (req.session.user.permissionlvl != 255) {
        res.status(403).send("Nice try.");
    }
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data" + err);
    });
});

module.exports = router;
