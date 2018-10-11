var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var xss = require("xss");
var Page = require('mongoose').model('Page');

router.get("/:id", (req, res) => {
    if(req.session.user === undefined) {
        return res.status(403).send();
    }
    if ( req.session.user.permissionlvl === 255 ) {
        Page.deleteOne({_id: req.params.id }, (err, posts) => {
            res.redirect("/admin/listpages");
        });
    } else {
        res.status(403).send();
    }
});
module.exports = router;