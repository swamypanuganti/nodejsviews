const messages = require('../models/messages');

// Get all messages
const getAll = async (req, res) => {
  try {
    const messagesData = await messages.find();
    res.json(messagesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
const getById = async (req, res) => {
  try {
    const messageData = await messages.findById(req.params.id);
    if (!messageData) {
      return res.status(404).json({ message: 'messages not found' });
    }
    res.json(messageData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createRecord = async (req, res) => {
  const messageData = new messages({
    name: req.body.name,
    email: req.body.email,
    // Add other fields as needed
  });

  try {
    const newMessage = await messageData.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
const updateRecord = async (req, res) => {
  try {
    const messageData = await messages.findById(req.params.id);
    if (!messageData) {
      return res.status(404).json({ message: 'messages not found' });
    }

    messageData.name = req.body.name || user.name;
    messageData.email = req.body.email || user.email;
    // Update other fields as needed

    const updatedMessage = await messages.save();
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteRecord = async (req, res) => {
  try {
    const messagesData = await messages.findByIdAndDelete(req.params.id);
    if (!messagesData) {
      return res.status(404).json({ message: 'messages not found' });
    } else {
      res.json({ message: 'messages deleted' });
    }

    // await messages.remove();
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
