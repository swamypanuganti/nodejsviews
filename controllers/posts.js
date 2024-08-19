const posts = require('../models/posts');

// Get all posts
const getAll = async (req, res) => {
  try {
    const postsData = await posts.find();
    res.json(postsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
const getById = async (req, res) => {
  try {
    const postsData = await posts.findById(req.params.id);
    if (!postsData) {
      return res.status(404).json({ message: 'posts not found' });
    }
    res.json(postsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createRecord = async (req, res) => {
  const postsData = new posts({
    name: req.body.name,
    content: req.body.content,
    creation_date: req.body.creation_date,
    media_path: req.body.media_path,
    likes_count: req.body.likes_count,
    shares_count: req.body.shares_count,
    comments_count: req.body.comments_count,



    // Add other fields as needed
  });

  try {
    const newPost = await postsData.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
const updateRecord = async (req, res) => {
  try {
    const postsData = await posts.findById(req.params.id);
    if (!postsData) {
      return res.status(404).json({ message: 'posts not found' });
    }

    postsData.name = req.body.name || user.name;
    postsData.email = req.body.email || user.email;
    // Update other fields as needed

    const updatedPost = await posts.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteRecord = async (req, res) => {
  try {
    // const postsData = await posts.findById(req.params.id);
    const deletedPost = await posts.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'posts not found' });
    } else {
      res.json({ message: 'posts deleted' });
    }

    // await postsData.remove();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createRecord,
  updateRecord,
  deleteRecord,
};
