const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  userfrom: {type:String},
  userto: {type:String},
  message:{type:String},
  group_id:{type:Number},
  created_at: { type: Date, default: Date.now },

  // Add other fields as needed
});

const messages = mongoose.model('messages', messagesSchema);

module.exports = messages;