var express = require('express');
var session = require('express-session');
var config = require('../../config');
var User = require('../../lib/user');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if(req.session.user.permissionlvl === 255) {
        res.render('addblogpost');
    }
    return res.status(403).send();
})

module.exports = router;