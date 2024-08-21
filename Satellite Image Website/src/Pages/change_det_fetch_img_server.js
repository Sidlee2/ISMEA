// change_det_fetch_img_server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Satellite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for the image metadata
const imageSchema = new mongoose.Schema({
  year: Number,
  region: { type: String, lowercase: true }, // Convert region to lowercase
  imageData: Buffer,
  state: { type: String, default: 'original' }, // Set the default state to 'original'
  extension: String, // Add a new field for image extension
});

// Create the model
const ImageModel = mongoose.model('change_detection_image', imageSchema);

// API endpoint to fetch image data
app.get('/api/images', async (req, res) => {
  const { year, region, state } = req.query;

  try {
    console.log(`Fetching image data for year ${year || 'N/A'}, region ${region}, and state ${state || 'original'}`);
    const query = { region: region.replace(/\s/g, '').toLowerCase() }; // Remove spaces and convert region to lowercase
    if (state) {
      query.state = state;
    } else {
      query.state = 'original'; // Default to 'original' state if not provided
    }
    if (state !== 'changed' && year) {
      query.year = parseInt(year);
    }

    const imageData = await ImageModel.findOne(query);

    if (imageData) {
      console.log('Image data found:', imageData);
      res.json({ imageData: imageData.imageData.toString('base64'), extension: imageData.extension }); // Send the extension along with the image data
    } else {
      console.log('Image data not found');
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).json({ error: 'Error fetching image data' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});