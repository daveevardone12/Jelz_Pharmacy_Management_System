// passport-config.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length === 0) {
        return done(null, false, { message: 'No user with that username' });
      }

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return done(new Error('User not found'));
      }
      return done(null, result.rows[0]);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initialize;
