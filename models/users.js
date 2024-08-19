const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  // Define users schema fields
  name: String,
  email: String,
  age: String,
  gender: String,
  password: String, 
  mobilenumber: Number
  // Add other fields as needed
});

const users = mongoose.model('users', usersSchema);

module.exports = users;