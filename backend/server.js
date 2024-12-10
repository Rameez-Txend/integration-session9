const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use('/api/tasks', taskRoutes);

const DB_URI = 'mongodb+srv://rameezumer:W9Rt77rbcUxYCNE0@cluster0.yihap.mongodb.net/databaseUno?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(DB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Failed to connect to MongoDB Atlas", err));
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
