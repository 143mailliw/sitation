var express = require('express');
var session = require('express-session');
var crypto = require('crypto');
var router = express.Router();
var bluebird = require('bluebird');
var fs = bluebird.promisifyAll(require('fs'));
var mongoose = require('mongoose');

router.get('/', function(req, res) {
    return res.render('setup/setup');
})
router.post('/complete', function(req, res) {
    //create the new user
    mongoose.connect(req.body.mongodb, { useNewUrlParser: true});
    var User = require('../lib/user');
    //hash that bad boy. there will be no password stealing here!
    var secret = Math.floor((Math.random() * 1000000000) + 1).toString();
    var passwordhashed = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex');
    var newuser = new User({
        username: req.body.username,
        password: passwordhashed,
        permissionlvl: 255
    });
    newuser.save(function(err, savedUser) {
        if(err) {
            console.log(err);
            //return res.status(500).send();
        }
        fs.readFile('./config.default.js', 'utf8', function(err, data) {
            if (err) throw err;
            var sessionsecret = Math.floor((Math.random() * 1000000000) + 1).toString();
            //I am nothing but willing to do this poorly for the sake of getting this done right now.
            fs.writeFile("./config.js", data.replace("mongodbc", req.body.mongodb).replace("sitenamec", req.body.sitename).replace("secretc", secret).replace("sessionsecretc", sessionsecret).replace("1337", req.body.port), function(err) {
                console.log("Setup complete. Please restart.");
            });
            return res.render('setup/setup_complete');
        });
    })
})

module.exports = router;