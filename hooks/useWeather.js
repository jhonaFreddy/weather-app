import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '87b5cbee745212ab600b441c7a9becec';

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data');
    }
  };

  return { fetchWeatherData, weatherData, error };
};

export default useWeather;
