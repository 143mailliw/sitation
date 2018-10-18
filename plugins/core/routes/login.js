var express = require('express');
var User = require('../../../lib/user');
var session = require('express-session');
var crypto = require('crypto');
var router = express.Router();
var config = require('../../../config');
var xss = require("xss");
var Topbar = require('mongoose').model('Topbar');

router.post('/', function(req, res) {
    var username = xss(req.body.username);
    var password = xss(req.body.password);
    //hash that bad boy. there will be no password stealing here!
    var passwordhashed = crypto.createHmac('sha256', config.secret)
        .update(password)
        .digest('hex');
    User.findOne({username: username, password: passwordhashed}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        if(user == undefined) {
            return res.redirect("/login/" + "Your username or password is incorrect.")
        }
        req.session.user = user;
        res.redirect('/');
    })
});

router.get("/", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    res.render(require.resolve('../views/users/login'), { usersession: req.session.user, links: topbardata, isalert: false });
});

router.get("/:alert", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    res.render(require.resolve('../views/users/login'), { usersession: req.session.user, links: topbardata, isalert: true, alert: req.params.alert });
});

module.exports = router;