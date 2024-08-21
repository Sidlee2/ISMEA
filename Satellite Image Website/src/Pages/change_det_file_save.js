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

    // Define the path to the folder containing the subfolders
    const folderPath = 'C:\\Users\\rahul\\OneDrive\\Desktop\\Jaypee Assignments\\Sem 6\\Minor\\change detection\\Website\\Monitoring-of-satellite-images\\Satellite Image Website\\src\\Data\\Change detection';

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

    // Loop through the subfolders
    fs.readdirSync(folderPath).forEach((subfolder) => {
      const subfolderPath = path.join(folderPath, subfolder);
      if (fs.lstatSync(subfolderPath).isDirectory()) {
        // Loop through the files in the subfolder
        fs.readdirSync(subfolderPath).forEach((file) => {
          if (file && (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))) {
            const filePath = path.join(subfolderPath, file);

            // Extract the name, year, state, and extension from the filename
            const fileNameParts = file.split('_');
            const name = fileNameParts[0].replace(/\s/g, '').toLowerCase(); // Remove spaces and convert to lowercase
            const year = fileNameParts.length > 1 ? parseInt(fileNameParts[1]) : null;
            const stateWithExtension = fileNameParts.length > 2 ? fileNameParts.slice(2).join('_') : 'original';
            const state = stateWithExtension.split('.')[0].toLowerCase();
            const extension = path.extname(file).slice(1).toLowerCase(); // Extract the extension and convert to lowercase

            // Check if an image with the same year, region, and state already exists
            const query = { region: name, state };
            if (state === 'original' && year !== null) {
              query.year = year;
            }

            ImageModel.findOne(query)
              .then((existingImage) => {
                if (existingImage) {
                  console.log(`Skipping ${file} as an image with the same region and state already exists in the database`);
                } else {
                  // Read the image file
                  const imageData = fs.readFileSync(filePath);

                  // Create a new document in change_detection_image
                  const imageMetadata = new ImageModel({
                    year: year !== null ? year : state === 'changed' ? 0 : null, // Set year to 0 for 'changed' state, null for 'original' with no year
                    region: name,
                    imageData: imageData,
                    state: state,
                    extension: extension, // Add the extension
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
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });