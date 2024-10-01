// End Points for Calling Api's



const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// List all users
router.get('/', userController.getAllUsers);

// Form to create a new user
router.get('/getUser', userController.getUserForm);

// Create a new user
router.post('/add', userController.createUser);

// Edit user form
router.get('/users/:id/edit', userController.editUserForm);

// Update user
router.put('/users/:id', userController.updateUser);

// Delete user
router.delete('/users/:id', userController.deleteUser);

// Delete all users
router.delete('/users', userController.deleteAllUsers);

module.exports = router;

