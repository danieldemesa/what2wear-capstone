import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SavedLooksPage.css';

const SavedLooksPage = () => {
  const [looks, setLooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSavedLooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/saved-looks', {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        if (Array.isArray(res.data)) {
          setLooks(res.data);
        } else {
          setLooks([]); 
          setError('Saved looks is not an array');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch saved looks');
      }
    };

    fetchSavedLooks();
  }, []);

  return (
    <div className="saved-looks-container">
      <h2>🧥 Saved Looks</h2>
      {error && <p className="error">{error}</p>}
      {looks.length === 0 && !error ? (
        <p>No looks saved yet.</p>
      ) : (
        <div className="looks-list">
          {looks.map((look, index) => (
            <div key={index} className="look-card">
              <img src={look.imageUrl} alt="Saved Look" />
              <p>Weather: {look.weather}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLooksPage;
