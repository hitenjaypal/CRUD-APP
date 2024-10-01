const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Allows us to use PUT and DELETE methods
app.set('view engine', 'ejs');

// Routes
app.use('/', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





// 1. app.js is now minimal and focuses on app setup.

// 2. userController.js contains the logic for CRUD operations.

// 3. userModel.js contains the Mongoose schema for users.

// 4. userRoutes.js defines routes and connects them to controller functions.

// 5. db.js handles the database connection.