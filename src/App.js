// src/App.js
import React, { useState } from 'react';
import ImageSearch from './components/ImageSearch';
import ImageResults from './components/ImageResults';
import ImageCanvas from './components/ImageCanvas';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleResults = (results) => {
    setImages(results);
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="App">
      <h1>Image Editor App</h1>
      <ImageSearch onResults={handleResults} />
      {!selectedImage ? (
        <ImageResults images={images} onSelectImage={handleSelectImage} />
      ) : (
        <ImageCanvas selectedImage={selectedImage} />
      )}
    </div>
  );
}

export default App;
