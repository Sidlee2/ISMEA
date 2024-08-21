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
    const folderPath = 'C:\\Users\\rahul\\OneDrive\\Desktop\\Jaypee Assignments\\Sem 6\\Minor\\change detection\\Website\\Monitoring-of-satellite-images\\Satellite Image Website\\src\\Data\\Land Cover Classification';

    // Define the schema for the image metadata
    const imageSchema = new mongoose.Schema({
      year: Number,
      region: { type: String, lowercase: true }, // Convert region to lowercase
      imageData: Buffer,
      class: { type: String, lowercase: true }, // Field for land cover class
      extension: String, // Add a new field for image extension
    });

    // Create the model
    const ImageModel = mongoose.model('land_cover_classification', imageSchema);

    // Helper function to traverse directories recursively
    function traverseDirectories(currentPath) {
      fs.readdirSync(currentPath).forEach((item) => {
        const itemPath = path.join(currentPath, item);
        const stats = fs.lstatSync(itemPath);

        if (stats.isDirectory()) {
          traverseDirectories(itemPath); // Recurse into subdirectories
        } else if (stats.isFile() && (item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png'))) {
          processFile(itemPath);
        }
      });
    }

    // Function to process each image file
    function processFile(filePath) {
      const file = path.basename(filePath);

      // Extract the region, year, class, and extension from the filename
      const fileNameParts = file.split('_');
      const region = fileNameParts[0].toLowerCase(); // Convert region to lowercase
      const year = parseInt(fileNameParts[1]);
      const classWithExtension = fileNameParts.slice(2).join('_');
      const classStr = classWithExtension.split('.')[0].toLowerCase();
      const extension = path.extname(file).slice(1).toLowerCase(); // Extract the extension and convert to lowercase

      // Check if an image with the same year, region, and class already exists
      const query = { region, year, class: classStr };

      ImageModel.findOne(query)
        .then((existingImage) => {
          if (existingImage) {
            console.log(`Skipping ${file} as an image with the same region, year, and class already exists in the database`);
          } else {
            // Read the image file
            const imageData = fs.readFileSync(filePath);

            // Create a new document in land_cover_class
            const imageMetadata = new ImageModel({
              year,
              region,
              imageData,
              class: classStr,
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

    // Start traversing the directories from the folderPath
    traverseDirectories(folderPath);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });