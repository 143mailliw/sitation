var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Page = require('mongoose').model('Page');
var Topbar = require('mongoose').model('Topbar');

/* GET home page. */
router.get("/", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    if(req.session.user.permissionlvl === 255) {
        if(req.session.user === undefined) {
            return res.status(403).send();
        }
        Page.find({}, (err, pages) => {
            res.render(require.resolve('../vies/listpages'), { pages: pages, usersession: req.session.user, links: topbardata })
        });
    } else {
        res.status(403).send();
    }

});
module.exports = router;
