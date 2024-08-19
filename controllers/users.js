const users = require('../models/users.js');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    console.log('==============>>>>>',req.body,users);
    const usersData = await users.find({});
    res.json(usersData);
    // res.render('users/index', { usersData });
  } catch (error) {
    console.log('==============>>>>>',error);
    res.status(500).json({ message: error.message });
  }
};
// Get all users
const getAll = async (req, res) => {
  try {
    console.log('==============>>>>>',req.body,users);
    const usersData = await users.find({});
    // res.json(usersData);
    res.render('users/index', { usersData });
  } catch (error) {
    console.log('==============>>>>>',error);
    res.status(500).json({ message: error.message });
  }
};
const gotocreate = async (req,res)=>{
  console.log('inside gotocreate in controller');
  res.render('users/create',{req});
}
const gotoedit = async (req,res)=>{
  const user = await users.findById(req.params.id);
  res.render('users/edit', { user });
}
// Get a single user by ID
const getById = async (req, res) => {
  try {
    const usersData = await users.findById(req.params.id);
    if (!usersData) {
      return res.status(404).json({ message: 'users not found' });
    }
    res.json(usersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createRecord = async (req, res) => {
  const usersData1 = new users({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    password: req.body.password,
    mobilenumber: req.body.mobilenumber,

    // Add other fields as needed
  });
  try {
    const newUser = await usersData1.save();
    const usersData = await users.find({});
    // res.render('users/index', { usersData });
    res.status(201).json(newUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
const updateRecord = async (req, res) => {
  try {
    const usersData = await users.findById(req.params.id);
    if (!usersData) {
      return res.status(404).json({ message: 'users not found' });
    }

    usersData.name = req.body.name || user.name;
    usersData.email = req.body.email || user.email;
    // Update other fields as needed

    const updatedUser = await usersData.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
const updateRecordFromForm = async (req, res) => {
  try {
    const usersData1 = await users.findById(req.params.id);
    if (!usersData1) {
      return res.status(404).json({ message: 'users not found' });
    }

    usersData1.name = req.body.name || user.name;
    usersData1.email = req.body.email || user.email;
    // Update other fields as needed

    const updatedUser = await usersData1.save();
    const usersData = await users.find({});
    // res.json(usersData);
    res.render('users/index', { usersData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteRecord = async (req, res) => {
  try {
    const deletedUser = await users.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'users not found' });
    } else {
      res.json({ message: 'users deleted' });
    }

    // await user.remove();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a user by ID
const login = async (req, res) => {
  try {
    const usersData = await users.find({email:req.body.email});
    console.log('-==============>>>>',usersData);
    if (usersData && usersData.length >0) {
      return res.status(200).json({ code:200, status:true,data: usersData,message: 'login completed' });
    } else{
      return res.status(200).json({ code:404, status:false,message: 'users not found' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getAllUsers,
  getById,
  createRecord,
  updateRecord,
  updateRecordFromForm,
  deleteRecord,
  gotocreate,
  gotoedit,
  login
};
