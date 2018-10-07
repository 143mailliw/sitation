var express = require('express');
var User = require('../../lib/user');
var session = require('express-session');
var crypto = require('crypto');
var router = express.Router();
var config = require('../../config');
var xss = require("xss");

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

        if(!user) {
            return res.status(404).send();
        }
        req.session.user = user;
        res.redirect('/');
    })
});

router.get("/", (req, res) => {
    res.render('login');
});

module.exports = router;