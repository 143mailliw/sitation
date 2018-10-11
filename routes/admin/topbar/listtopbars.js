var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Topbar = require('mongoose').model('Topbar');

// we already find topbars here, no need to do so again

/* GET home page. */
router.get("/", (req, res) => {
    if(req.session.user.permissionlvl === 255) {
        if(req.session.user === undefined) {
            return res.status(403).send();
        }
        Topbar.find({}, (err, topbar) => {
            res.status(200).res.render('topbar/listtopbars', { links: topbar, usersession: req.session.user })
        });
    } else {
        res.status(403).send();
    }

});
module.exports = router;
