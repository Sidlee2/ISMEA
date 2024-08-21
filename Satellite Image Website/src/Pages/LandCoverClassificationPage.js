// LandCoverClassificationPage.js
import React, { useState } from 'react';
import './landcover.css';

const LandCoverClassificationPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [imageData, setImageData] = useState(null);
  const [imageExtension, setImageExtension] = useState(null);

  const regions = ['Bhatinda', 'Faridkot', 'Moga', 'Ludhiana'];
  const years = [2015, 2017, 2019, 2021];

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const fetchImageData = () => {
    if (selectedRegion && selectedYear) {
      fetch(`/api/images?region=${selectedRegion.toLowerCase().replace(/\s/g, '')}&year=${selectedYear}`)
        .then((response) => response.json())
        .then((data) => {
          setImageData(data.imageData);
          setImageExtension(data.extension);
        })
        .catch((error) => {
          console.error('Error fetching image data:', error);
        });
    }
  };

  return (
    <div className="land-cover-container">
      <h2 className="land-cover"> Land Cover Classification</h2>
      <div className="description">
        <p>
          The surface of the Earth is divided into various aspects and assemblies of land. The classification of this land into various classes is called land cover classification. The classes may include water, snow, grassland, forest, roads etc. Land Cover Classification is one of the most crucial steps for the processing of satellite data.
        </p>
      </div>
      <div className="input-container-lc">
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={fetchImageData}>APPLY</button>
      </div>
      <div className="image-container-lc">
        {imageData ? (
          <img
            src={`data:image/${imageExtension};base64,${imageData}`}
            alt="Satellite Image"
            className="satellite-image"
          />
        ) : (
          <p>No image data available</p>
        )}
      </div>
      {/* <div className="classification-result">
        <p>The area has displayed the following classes:</p>
        <ul>
          <li>1. Houses - 20%</li>
          <li>2. Roads - 15%</li>
          <li>3. Dense buildings - 60%</li>
          <li>4. Urban Colony - 5%</li>
        </ul>
        <p>It can be deduced from the image that the area of Ludhiana, Punjab, shows the above classes and hence can be classified as a developing city.</p>
      </div> */}
    </div>
  );
};

export default LandCoverClassificationPage;
