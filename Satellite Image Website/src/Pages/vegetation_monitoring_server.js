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
  region: { type: String, lowercase: true }, // Convert region to lowercase
  imageData: Buffer,
  extension: String, // Add a new field for image extension
});

// Create the model
const ImageModel = mongoose.model('vegetation_monitorings', imageSchema);

// API endpoint to fetch image data
app.get('/api/images', async (req, res) => {
  const { region } = req.query;

  try {
    console.log(`Fetching image data for region ${region}`);
    const query = { region: region.replace(/\s/g, '').toLowerCase() }; // Remove spaces and convert region to lowercase

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