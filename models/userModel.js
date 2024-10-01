const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  address: String,
});

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
