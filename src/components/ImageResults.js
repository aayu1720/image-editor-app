// src/components/ImageResults.js
import React from 'react';

const ImageResults = ({ images, onSelectImage }) => {
  return (
    <div className="image-results">
      {images.map((image) => (
        <div key={image.id} className="image-container">
          <img src={image.src.medium} alt={image.alt} />
          <button onClick={() => onSelectImage(image)}>Add Captions</button>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;
