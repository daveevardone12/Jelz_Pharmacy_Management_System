// routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET login page
router.get('/', (req, res) => {
  res.render('login', { message: req.session.messages || [] });
});

// POST login using Passport LocalStrategy
router.post('/login/submit', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureMessage: true
  })
);

// Middleware to protect routes
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

// Dashboard route - protected
router.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
