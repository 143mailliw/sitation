var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var adminPages = require('mongoose').model('adminPages');

router.post('/', (req, res) => {
    if (req.session.user.permissionlvl != 255) {
        res.status(403).send("Nice try.");
    }
    var topbardata = new Topbar({name:"Whoops! We did a fucksy wucksy. The navbar system is broken!", url: "/"});
    Topbar.find({}, (err, links) => {
        topbardata = links;
    });
    res.render(require.resolve('../views/viewpost'), { post: posts, usersession: req.session.user, links: topbardata });
});

module.exports = router;
