const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
};
