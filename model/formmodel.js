const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    troy: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from the start and end
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model('Troy', userSchema);
