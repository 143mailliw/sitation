var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Topbar = require('mongoose').model('Topbar');

router.post('/', (req, res) => {
    var urlText = req.body.url;
    var nameText = req.body.name;
    var permreqNumber = 0;
    var topbarData = new Topbar({url: urlText, name: nameText, permreq: permreqNumber});
    if (req.session.user.permissionlvl != 255) {
        res.status(403).send("Nice try.");
    }
    topbarData.save().then( result => {
        res.redirect("/admin/listtopbars");
    }).catch(err => {
        res.status(400).send("Unable to save data" + err);
    });
});

module.exports = router;
