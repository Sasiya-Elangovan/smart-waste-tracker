
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes

const pickupRoutes = require('./routes/pickupRoutes');
app.use('/api/pickups', pickupRoutes); 


// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
