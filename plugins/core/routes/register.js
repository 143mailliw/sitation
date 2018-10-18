var express = require('express');
var User = require('../../../lib/user');
var crypto = require('crypto');
var router = express.Router();
var config = require('../../../config');
var xss = require("xss");
var Topbar = require('mongoose').model('Topbar');

router.post('/', function(req, res) {
    var username = xss(req.body.username);
    var password = xss(req.body.password);
    var permissionlvl = 1;
    //hash that bad boy. there will be no password stealing here!
    var passwordhashed = crypto.createHmac('sha256', config.secret)
        .update(password)
        .digest('hex');
    var newuser = new User({
        username: username,
        password: passwordhashed,
        permissionlvl: permissionlvl
    });
    User.findOne({username: username}, (err, user) => {
        if(user != undefined) {
            return res.redirect("/register/" + "That user already exists!")
        }
    });
    newuser.save(function(err, savedUser) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        return res.redirect('/');
    })
});

router.get("/", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    res.render(require.resolve('../views/users/register'), { usersession: req.session.user, links: topbardata, isalert: false });
});

router.get("/:alert", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    res.render(require.resolve('../views/users/register'), { usersession: req.session.user, links: topbardata, isalert: true, alert: req.params.alert });
});

module.exports = router;