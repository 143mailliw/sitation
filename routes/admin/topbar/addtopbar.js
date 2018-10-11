var express = require('express');
var session = require('express-session');
var config = require('../../../config');
var User = require('../../../lib/user');
var crypto = require('crypto');
var router = express.Router();
var Topbar = require('mongoose').model('Topbar');

var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
Topbar.find({}, (err, links) => {
    topbardata = links;
});

router.get('/', function(req, res) {
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if(req.session.user.permissionlvl === 255) {
        return res.status(200).res.render('topbar/addtopbar', { usersession: req.session.user, links: topbardata });
    } else {
        return res.status(403).send();
    }
})

module.exports = router;