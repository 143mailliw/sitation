var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Page = require('mongoose').model('Page');
var Topbar = require('mongoose').model('Topbar');

/* GET routes page. */
router.get("/:id", (req, res) => {
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    Page.findById({_id: req.params.id }, (err, page) => {
        res.render(require.resolve('../views/viewpage'), { page: page, usersession: req.session.user, links: topbardata })
    });
});
module.exports = router;