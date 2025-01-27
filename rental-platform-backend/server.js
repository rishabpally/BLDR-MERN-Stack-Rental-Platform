const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rentalPlatform')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the MongoDB Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  pricePerDay: Number,
  available: Boolean,
  rentals: [
    {
      startDate: Date,
      endDate: Date,
    },
  ],
});

const Item = mongoose.model('Item', itemSchema);

// Backup to JSON File
async function backupToJSON() {
  const items = await Item.find({});
  fs.writeFileSync('./data/items_backup.json', JSON.stringify(items, null, 2), 'utf8');
  console.log('Backup completed! Data saved to ./data/items_backup.json');
}

// Restore from JSON File
async function restoreFromJSON() {
  try {
    const data = JSON.parse(fs.readFileSync('./data/items_backup.json', 'utf8'));
    await Item.deleteMany({}); // Clear existing database entries
    await Item.insertMany(data);
    console.log('Restore completed! Data restored from ./data/items_backup.json');
  } catch (error) {
    console.error('Error restoring from JSON:', error);
  }
}

// Routes
const rentalRoutes = require('./routes/rentals')(Item); // Pass the Item model to routes
app.use('/api/rentals', rentalRoutes);

// Backup Route
app.get('/api/backup', async (req, res) => {
  await backupToJSON();
  res.json({ message: 'Backup completed!' });
});

// Restore Route
app.get('/api/restore', async (req, res) => {
  await restoreFromJSON();
  res.json({ message: 'Restore completed!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
