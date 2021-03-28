const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('API LOGIN');
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.send('Wrong username or password');
    req.login(user, () => {
      const body = { _id: user.id, username: user.username, displayname: user.displayname };
      const token = jwt.sign({ user: body }, process.env.JWTSECRET);
      return res.json({ token });
    })
  })(req, res, next);
})

router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user);
  if (!req.user) {
    req.json({
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
