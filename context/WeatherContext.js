// WeatherContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import useWeather from '../hooks/useWeather';

// Crear el contexto
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { fetchWeatherData, weatherData, error } = useWeather();
  const [selectedCity, setSelectedCity] = useState(null);

  // Usar las coordenadas de Cochabamba para la carga inicial
  useEffect(() => {
    // Latitud y longitud de Cochabamba
    fetchWeatherData(-17.3833, -66.1667);
  }, []);

  const selectCity = (city) => {
    setSelectedCity(city);
    fetchWeatherData(city.lat, city.lon);
  };

  return (
    <WeatherContext.Provider value={{ weatherData, error, selectCity, selectedCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Hook para acceder al contexto fácilmente
export const useWeatherContext = () => useContext(WeatherContext);
