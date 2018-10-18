var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Page = require('mongoose').model('Page');

router.post('/', (req, res) => {
    var bodyText = req.body.body;
    var nameText = req.body.name;
    var permreqNumber = 0;
    var pageData = new Page({body: bodyText, name: nameText, permreq: permreqNumber});
    if (req.session.user.permissionlvl != 255) {
        res.status(403).send("Nice try.");
    }
    pageData.save().then( result => {
        res.redirect('/viewpage/' + result._id );
    }).catch(err => {
        res.status(400).send("Unable to save data" + err);
    });
});

module.exports = router;
