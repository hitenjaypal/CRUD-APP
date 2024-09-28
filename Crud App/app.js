const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Allows us to use PUT and DELETE methods
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  address: String,
});

const User = mongoose.model('users', userSchema);

// Routes

// Home route to list users
app.get('/', async (req, res) => {
  try {
    const users = await User.find({}); // Fetch users from the database
    res.render('index', { users: users }); // Pass the fetched users to the 'index' view
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Form to create a new user
app.get('/getUser', (req, res) => {
  res.render('new');
});

// Create a new user
app.post('/add', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
    });

    await newUser.save(); // Save the new user
    res.redirect('/'); // Redirect to the homepage after successful save
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the user");
  }
});

// Edit user form
app.get('/users/:id/edit', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('edit', { user });
});

// Update user
app.put('/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
  });
  res.redirect('/');
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Delete all users
app.delete('/users', async (req, res) => {
  try {
    await User.deleteMany({}); // Deletes all users
    res.redirect('/'); // Redirect back to the homepage
  } catch (err) {
    res.status(500).send("Error deleting all users");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
