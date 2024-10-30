'use client'
import React, { useState, useEffect } from 'react';
import CardDia from '@/components/CardDia';
import Detalles from '@/components/Detalles';
import ClimaLocal from '@/components/ClimaLocal';
import Input from '@/components/Input';
import { useWeatherContext } from '@/context/WeatherContext';
import axios from 'axios';

export default function Page() {
  const [showInput, setShowInput] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const { weatherData } = useWeatherContext();
  const defaultLocation = {
    lat: -17.3833,
    lon: -66.1667
  };
  const toggleView = () => setShowInput(!showInput);
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            lat: weatherData?.coord?.lat || defaultLocation.lat,
            lon: weatherData?.coord?.lon || defaultLocation.lon,
            appid: '87b5cbee745212ab600b441c7a9becec',
            units: 'metric'
          }
        });
        const dailyData = {};
        response.data.list.forEach((entry) => {
          const date = entry.dt_txt.split(' ')[0];
          if (!dailyData[date]) {
            dailyData[date] = [];
          }
          dailyData[date].push(entry);
        });
        const forecastData = Object.keys(dailyData).slice(0, 5).map((date) => {
          const dayEntries = dailyData[date];
          const tempMax = Math.max(...dayEntries.map(entry => entry.main.temp_max));
          const tempMin = Math.min(...dayEntries.map(entry => entry.main.temp_min));
          return {
            date,
            tempMax,
            tempMin,
            icon: dayEntries[0].weather[0].icon
          };
        });
        setForecastData(forecastData);
      } catch (error) {
        console.error("Error fetching forecast data:", error.response ? error.response.data : error.message);
      }
    };
    fetchForecast();
  }, [weatherData]);
  return (
    <div className='md:flex'>
      {!showInput && <ClimaLocal onSearchClick={toggleView} />}
      {showInput && <Input onCloseClick={toggleView} />}
      <section className='bg-[#100e1d] w-full md:w-[70%] h-full pt-2 px-24 md:px-24 flex flex-col gap-3'>
        <section className='justify-end flex'>
          <button className='cursor-pointer w-10 h-10 mx-2 text-xl bg-slate-600 text-white rounded-full'>°C</button>
          <button className='cursor-pointer w-10 h-10 mx-2 text-xl bg-slate-600 text-white rounded-full'>°F</button>
        </section>
        <section className='flex gap-5 flex-wrap items-center justify-center'>
          {forecastData.map((day, index) => (
            <CardDia
              key={index}
              date={day.date}
              icon={day.icon}
              tempMax={day.tempMax}
              tempMin={day.tempMin}
            />
          ))}
        </section>
        <h3 className='font-bold text-white text-2xl'>Today's Highlights</h3>
        <Detalles />
      </section>
    </div>
  );
}