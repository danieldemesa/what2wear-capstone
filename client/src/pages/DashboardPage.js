import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [protectedMessage, setProtectedMessage] = useState('');
  const [weather, setWeather] = useState(null);
  const [suggestion, setSuggestion] = useState('');

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
        const apiKey = '0e7b1d83cf17ce9f1db97996bb9d77bd'; // your real API key
        const city = 'Toronto'; // or dynamically get from user input/GPS
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
    </div>
  );
}

export default DashboardPage;
