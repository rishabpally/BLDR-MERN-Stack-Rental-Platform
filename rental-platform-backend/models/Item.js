const mongoose = require('mongoose');

// Define the Item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  rentals: [
    {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

// Create the Item model
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
module.exports = Item;
