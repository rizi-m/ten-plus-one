const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { getPool } = require('../pgpool');
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('API LOGIN');
  console.log('in session');
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).send('Wrong username or password');
    req.login(user, () => {
      const body = {
        _id: user.id,
        username: user.username,
        displayname: user.displayname,
      };
      const token = jwt.sign({ user: body }, process.env.JWTSECRET);
      return res.json({ token, user: body });
    });
  })(req, res, next);
});

router.get(
  '/check',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user) {
      res.json({
        isAuthenticated: false,
      });
    } else {
      const pool = getPool();
      const sql =
        'SELECT id, usertype_id, displayname, username FROM Users WHERE id=$1';
      const result = await pool.query(sql, [req.user.id]);
      res.json({
        isAuthenticated: true,
        user: result.rows[0],
      });
    }
  }
);

router.get('/logout', (req, res) => {
  console.log('logging out');
  req.logout();

  res.json({
    message: 'Logout successful',
  });
  console.log('logged out');
});

module.exports = router;
