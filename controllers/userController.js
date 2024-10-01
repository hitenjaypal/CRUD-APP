// Api's

const User = require('../models/userModel');

// List all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index', { users });
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
};

// Show form for creating new user
exports.getUserForm = (req, res) => {
  res.render('new');
};

// Add a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
    });
    await newUser.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving the user');
  }
};

// Show edit form for user
exports.editUserForm = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('edit', { user });
};

// Update user
exports.updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
  });
  res.redirect('/');
};

// Delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

// Delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting all users');
  }
};
