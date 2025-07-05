import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [protectedMessage, setProtectedMessage] = useState('');
  const [weather, setWeather] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('top');
  const [season, setSeason] = useState('summer');
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/protected', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProtectedMessage(res.data.message);
      } catch {
        setProtectedMessage('❌ Not authorized');
      }
    };

    const fetchWeather = async () => {
      try {
        const apiKey = '0e7b1d83cf17ce9f1db97996bb9d77bd';
        const city = 'Toronto';
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeather(res.data);
        const temp = res.data.main.temp;
        if (temp >= 25) setSuggestion('👕 T-shirt and shorts');
        else if (temp >= 15) setSuggestion('🧥 Light jacket and jeans');
        else setSuggestion('🧣 Warm coat and boots');
      } catch {
        setWeather(null);
        setSuggestion('Unable to fetch weather');
      }
    };

    fetchProtectedData();
    fetchWeather();
  }, []);

  const handleImageChange = (e) => setImage(e.target.files[0]);

const handleUpload = async () => {
  if (!image) return setUploadMessage('⚠️ Please select an image.');
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('image', image);
  formData.append('category', category);
  formData.append('season', season);

  try {
    const uploadRes = await axios.post('http://localhost:4000/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    setUploadMessage('✅ Upload and save successful!');
    setImage(null);
  } catch (err) {
    console.error('Upload error:', err.response?.data || err.message);
    setUploadMessage('❌ Upload failed.');
  }
};

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>{protectedMessage}</p>

      {weather && (
        <div className="weather-section">
          <h3>Current Weather in {weather.name}</h3>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <p>👗 Outfit Suggestion: <strong>{suggestion}</strong></p>
        </div>
      )}

      <div className="upload-section">
        <h3>Upload an Outfit Item</h3>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="shoes">Shoes</option>
        </select>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
        </select>
        <button onClick={handleUpload}>Upload</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>
    </div>
  );
}

export default DashboardPage;
