import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SavedLooksPage() {
  const [savedLooks, setSavedLooks] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [randomLook, setRandomLook] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSavedLooks();
    fetchClothingItems();
  }, []);

  const fetchSavedLooks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/saved-looks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedLooks(res.data);
    } catch (err) {
      console.error('❌ Error fetching saved looks:', err);
    }
  };

  const fetchClothingItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/outfits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClothing(res.data);
    } catch (err) {
      console.error('❌ Error fetching outfits:', err);
    }
  };

  const handleGenerate = () => {
    const tops = clothing.filter(c => c.category === 'top');
    const bottoms = clothing.filter(c => c.category === 'bottom');
    const shoes = clothing.filter(c => c.category === 'shoes');

    const getRandom = (items) => items[Math.floor(Math.random() * items.length)];

    const top = getRandom(tops);
    const bottom = getRandom(bottoms);
    const shoe = getRandom(shoes);

    setRandomLook({ top, bottom, shoe });
  };

  return (
    <div className="saved-looks-page">
      <h2>Saved Clothing Items</h2>

      <button className="generate-btn" onClick={handleGenerate}>🎲 Randomize Outfit</button>

      {randomLook && (
        <div className="look-card">
          <h3>Generated Look:</h3>
          <div className="outfit-images">
            {randomLook.top && <img src={randomLook.top.imageUrl} alt="Top" />}
            {randomLook.bottom && <img src={randomLook.bottom.imageUrl} alt="Bottom" />}
            {randomLook.shoe && <img src={randomLook.shoe.imageUrl} alt="Shoes" />}
          </div>
        </div>
      )}

      <h3>Saved Fits</h3>
      <div className="looks-grid">
        {savedLooks.map((look, index) => (
          <div key={index} className="look-card">
            <div className="outfit-images">
              {look.top && <img src={look.top} alt="Top" />}
              {look.bottom && <img src={look.bottom} alt="Bottom" />}
              {look.shoes && <img src={look.shoes} alt="Shoes" />}
            </div>
            <p>Season: {look.season}</p>
          </div>
        ))}
      </div>

      <h3>Your Clothing Gallery</h3>
      <div className="looks-grid">
        {clothing.map((item, index) => (
          <div key={index} className="look-card">
            <img src={item.imageUrl} alt={item.category} />
            <p>{item.category} ({item.season})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedLooksPage;
