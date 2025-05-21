// server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const initializePassport = require('./passport-config');
initializePassport(passport);

const routes = require('./routes/login');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_KEY || 'secretkey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 JPMS server is running at http://localhost:${PORT}`);
});
