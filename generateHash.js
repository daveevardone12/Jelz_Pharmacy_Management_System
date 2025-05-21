// generateHash.js
const bcrypt = require('bcrypt');

const plainPassword = 'admin123'; // Change to your desired password
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});
