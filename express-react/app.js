const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const { Pool } = require('pg');
require('dotenv-flow').config();

JWTStrategy = passportJWT.Strategy;

const apiRouter = require('./routes/api');
const app = express();
app.use(passport.initialize());

const pool = new Pool({
  host: 'localhost',
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  database: process.env.PGDB
});

pool.connect();


passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  console.log(username, password);
  console.log(typeof (username));
  username = username.replace(/'/g, "''");
  //TODO: Prevent SQL injection
  const res = await pool.query(`select * from users where username='${username}'`);
  if (res.rows.length == 1) {
    const user = res.rows[0];
    if (username === user.username && password === user.passwordhash) {
      return done(null, user);
    }
  }
  return done()
}));

passport.use(new JWTStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSECRET
}, async (jwt_payload, done) => {
  const res = await pool.query(`select * from users where id='${jwt_payload.user._id}'`);
  if (res.rows.length == 1) {
    return done(null, res.rows[0]);
  }
  return done(null, false, { message: 'Token not matched' })
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', apiRouter);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
