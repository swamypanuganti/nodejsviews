const mongoose = require('mongoose');
const groupsSchema = new mongoose.Schema({
  // Define groups schema fields
  name: String,
  email: String,
  mobilenumber:String,
  adminuser:String,
  number_of_users:Number,
  // Add other fields as needed
});

const groups = mongoose.model('groups', groupsSchema);

module.exports = groups;