const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  username: String,
  content: String,
  creation_date: String,
  media_path: String,
  likes_count:String,
  shares_count:String,
  comments_count:String
});

const posts = mongoose.model('posts', postsSchema);

module.exports = posts;