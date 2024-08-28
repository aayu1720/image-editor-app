// src/components/ImageSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search`, {
          headers: {
            Authorization: process.env.REACT_APP_PEXELS_API_KEY,
          },
          params: {
            query: query,
            per_page: 15,
          },
        });
        onResults(response.data.photos);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search images..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ImageSearch;
