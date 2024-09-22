require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');


const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
