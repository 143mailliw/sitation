var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Page = require('mongoose').model('Page');
var Topbar = require('mongoose').model('Topbar');

var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
Topbar.find({}, (err, links) => {
    topbardata = links;
});

/* GET blog page. */
router.get("/:id", (req, res) => {
    Page.findById({_id: req.params.id }, (err, page) => {
        res.status(200).render('pages/viewpage', { page: page, usersession: req.session.user, links: topbardata })
    });
});
module.exports = router;