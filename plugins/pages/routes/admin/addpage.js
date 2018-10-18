var express = require('express');
var session = require('express-session');
var config = require('../../../../config');
var User = require('../../../../lib/user');
var crypto = require('crypto');
var router = express.Router();
var Topbar = require('mongoose').model('Topbar');

router.get('/', function(req, res) {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if(req.session.user.permissionlvl === 255) {
        return res.render(require.resolve('../views/addpage'), { usersession: req.session.user, links: topbardata });
    } else {
        return res.status(403).send();
    }
})

module.exports = router;