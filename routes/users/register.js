var express = require('express');
var User = require('../../lib/user');
var crypto = require('crypto');
var router = express.Router();
var config = require('../../config');
var xss = require("xss");

router.post('/', function(req, res) {
  var username = xss(req.body.username);
  var password = xss(req.body.password);
  var permissionlvl = 1;
  //hash that bad boy. there will be no password stealing here!
  var passwordhashed = crypto.createHmac('sha256', config.secret)
      .update(password)
      .digest('hex');
  var newuser = new User({
      username: username,
      password: passwordhashed,
      permissionlvl: permissionlvl
  });
  newuser.save(function(err, savedUser) {
      if(err) {
          console.log(err);
          return res.status(500).send("WHOOPS!");
      }

      return res.status(200).send();
  })
})

module.exports = router;