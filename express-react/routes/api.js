const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user);
  console.log('in api');
  if (!req.user) {
    res.json({
      username: 'nobody'
    })
  } else {
    res.json({
      id: req.user.id,
      username: req.user.username,
      displayname: req.user.displayname,
    });
  }
})

module.exports = router;
