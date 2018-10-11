var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Page = require('mongoose').model('Page');

router.post('/:id', (req, res) => {
    var bodyText = req.body.body;
    var nameText = req.body.name;
    if (req.session.user.permissionlvl != 255) {
        res.status(403).send("Nice try.");
    }
    Page.updateOne({ _id: req.params.id }, { name: nameText, body: bodyText }, (err, post) => {
        res.redirect('/viewpage/' + post._id);
    }).catch(err => {
        res.status(400).send("Unable to save data" + err);
    });
});

module.exports = router;
