const groups = require('../models/groups');

// Get all groups
const getAllgroups = async (req, res) => {
  try {
    const groupsData = await groups.find();
    res.json(groupsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req,res) =>{
  const groupsData = await groups.find();
  res.render('groups/index', { groupsData });
}
// Get a single user by ID
const getById = async (req, res) => {
  try {
    const group = await groups.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'groups not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createRecord = async (req, res) => {
  const group = new groups({
    name: req.body.name,
    email: req.body.email,
    mobilenumber: req.body.mobilenumber,
    adminuser:req.body.adminuser,
    number_of_users:req.body.number_of_users,

    // Add other fields as needed
  });

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
const updateRecord = async (req, res) => {
  try {
    const group = await groups.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'groups not found' });
    }

    group.name = req.body.name || group.name;
    group.email = req.body.email || group.email;
    // Update other fields as needed

    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteRecord = async (req, res) => {
  try {
    const deletedGroup = await groups.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ message: 'groups not found' });
    } else {
         res.json({ message: 'groups deleted' });
    }
  } catch (error) {
    console.log('=============error in group delete',error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getAllgroups,
  getById,
  createRecord,
  updateRecord,
  deleteRecord,
};
