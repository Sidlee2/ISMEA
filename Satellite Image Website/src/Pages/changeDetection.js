// ChangeDetection.js
import React, { useState } from 'react'
import './changedetection.css'

const ChangeDetection = () => {
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedYearLeft, setSelectedYearLeft] = useState('')
  const [selectedYearRight, setSelectedYearRight] = useState('')
  const [imageDataLeft, setImageDataLeft] = useState(null)
  const [imageDataRight, setImageDataRight] = useState(null)
  const [imageDataChanged, setImageDataChanged] = useState(null)
  const [imageExtensionLeft, setImageExtensionLeft] = useState(null)
  const [imageExtensionRight, setImageExtensionRight] = useState(null)
  const [imageExtensionChanged, setImageExtensionChanged] = useState(null)

  const years = [1987, 1991, 2011, 2012, 2015, 2017]
  const regions = ['Dubai', 'ElephantButte', 'Ludhiana', 'Andasol']

  const handleRegionChange = e => {
    setSelectedRegion(e.target.value)
  }

  const handleYearChangeLeft = e => {
    setSelectedYearLeft(e.target.value)
  }

  const handleYearChangeRight = e => {
    setSelectedYearRight(e.target.value)
  }

  const fetchImageData = () => {
    if (selectedRegion && selectedYearLeft) {
      fetch(
        `/api/images?year=${selectedYearLeft}&region=${selectedRegion
          .toLowerCase()
          .replace(/\s/g, '')}`
      )
        .then(response => response.json())
        .then(data => {
          setImageDataLeft(data.imageData)
          setImageExtensionLeft(data.extension)
        })
        .catch(error => {
          console.error('Error fetching image data:', error)
        })
    }

    if (selectedRegion && selectedYearRight) {
      fetch(
        `/api/images?year=${selectedYearRight}&region=${selectedRegion
          .toLowerCase()
          .replace(/\s/g, '')}`
      )
        .then(response => response.json())
        .then(data => {
          setImageDataRight(data.imageData)
          setImageExtensionRight(data.extension)
        })
        .catch(error => {
          console.error('Error fetching image data:', error)
        })
    }

    if (selectedRegion) {
      fetch(
        `/api/images?region=${selectedRegion
          .toLowerCase()
          .replace(/\s/g, '')}&state=changed`
      )
        .then(response => response.json())
        .then(data => {
          setImageDataChanged(data.imageData)
          setImageExtensionChanged(data.extension)
        })
        .catch(error => {
          console.error('Error fetching image data:', error)
        })
    }
  }

  return (
    <div className="change-detection-container">
      <h2 className="change-detection-heading">Change Detection</h2>
      <p className="description">
        Change detection is the process of identifying differences in the state of an object or phenomenon by observing it at different times. It is a valuable technique in remote sensing and satellite imagery analysis, allowing for the identification and monitoring of changes in land cover, urban development, environmental conditions, and other phenomena over time.
      </p>
      <div className="input-container-cd">
        <div className="input-section-cd">
          <select value={selectedRegion} onChange={handleRegionChange}>
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select value={selectedYearLeft} onChange={handleYearChangeLeft}>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select value={selectedYearRight} onChange={handleYearChangeRight}>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button className="apply-button-cd" onClick={fetchImageData}>
          APPLY
        </button>
      </div>
      <div className="image-container-cd">
  <div className="image-box-cd">
    {imageDataLeft ? (
      <img
        src={`data:image/${imageExtensionLeft};base64,${imageDataLeft}`}
        alt="Satellite Image"
        className="satellite-image-cd"
      />
    ) : (
      <p>No image data available</p>
    )}
  </div>
  <div className="image-box-cd">
    {imageDataRight ? (
      <img
        src={`data:image/${imageExtensionRight};base64,${imageDataRight}`}
        alt="Satellite Image"
        className="satellite-image-cd"
      />
    ) : (
      <p>No image data available</p>
    )}
  </div>
</div>
      <div className="changed-image-container">
        <div className="image-wrapper-cd">
          {imageDataChanged ? (
            <img
              src={`data:image/${imageExtensionChanged};base64,${imageDataChanged}`}
              alt="Changed Satellite Image"
              className="satellite-image-cd"
            />
          ) : (
            <p>No changed image data available</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default ChangeDetection

