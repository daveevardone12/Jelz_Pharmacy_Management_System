// models/jpmsDB.js
const { Pool } = require('pg');
require('dotenv').config();

const jpms = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // Make sure your .env has DB_NAME=JPMS
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = jpms;
