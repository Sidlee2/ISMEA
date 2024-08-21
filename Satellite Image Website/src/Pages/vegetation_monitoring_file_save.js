const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Satellite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Define the path to the folder containing the images
    const folderPath = 'C:\\Users\\rahul\\OneDrive\\Desktop\\Jaypee Assignments\\Sem 6\\Minor\\change detection\\Website\\Monitoring-of-satellite-images\\Satellite Image Website\\src\\Data\\Vegetation Monitoring';

    // Define the schema for the image metadata
    const imageSchema = new mongoose.Schema({
      region: { type: String, lowercase: true }, // Convert region to lowercase
      imageData: Buffer,
      extension: String, // Add a new field for image extension
    });

    // Create the model
    const ImageModel = mongoose.model('vegetation_monitoring', imageSchema);

    // Loop through the files in the folder
    fs.readdirSync(folderPath).forEach((file) => {
      if (file && (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))) {
        const filePath = path.join(folderPath, file);

        // Extract the region and extension from the filename
        const region = path.basename(file, path.extname(file)).replace(/\s/g, '').toLowerCase(); // Remove spaces and convert to lowercase
        const extension = path.extname(file).slice(1).toLowerCase(); // Extract the extension and convert to lowercase

        // Check if an image with the same region already exists
        const query = { region };

        ImageModel.findOne(query)
          .then((existingImage) => {
            if (existingImage) {
              console.log(`Skipping ${file} as an image with the same region already exists in the database`);
            } else {
              // Read the image file
              const imageData = fs.readFileSync(filePath);

              // Create a new document in vegetation_monitoring
              const imageMetadata = new ImageModel({
                region,
                imageData,
                extension, // Add the extension
              });

              // Save the image metadata
              imageMetadata.save()
                .then(() => {
                  console.log(`Image metadata for ${file} saved successfully`);
                })
                .catch((err) => {
                  console.error(`Error saving image metadata for ${file}: ${err}`);
                });
            }
          })
          .catch((err) => {
            console.error(`Error checking for existing image ${file}: ${err}`);
          });
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });