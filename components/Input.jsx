import React, { useState } from 'react';
import cities from '../data/cities.json';
import { useWeatherContext } from '../context/WeatherContext';
export default function Input({ onCloseClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { selectCity } = useWeatherContext();
  const handleInputChange = (e) => setSearchTerm(e.target.value);
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      const results = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(results);
      setShowSuggestions(true);
    }
  };
  return (
    <div className='relative md:w-[30%] w-full h-screen md:h-screen bg-[#1e213a] p-10'>
      <button onClick={onCloseClick} className="absolute top-1 right-4 text-white text-4xl">&times;</button>
      <div className='flex md:flex-col lg:flex-row justify-between gap-5'>
        <div className='relative flex w-full'>
          <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
            <img src="search.svg" alt="" className="w-6" />
          </span>
          <input
            type="text"
            className='bg-transparent border text-gray-600 pl-12 w-full'
            placeholder='search location'
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <button className='bg-indigo-700 text-white text-lg p-1 ml-4 w-20 font-semibold' onClick={handleSearchClick}>
          Search
        </button>
      </div>
      {showSuggestions && filteredCities.length > 0 && (
        <div className='bg-transparent text-white mt-2 p-2 rounded-md max-h-48 overflow-y-auto'>
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className='p-2 hover:bg-indigo-700 cursor-pointer '
              onClick={() => {
                selectCity(city); // Selecciona la ciudad y obtiene el clima
                setShowSuggestions(false);
                onCloseClick(); // Cierra el Input
              }}
            >
              {city.name} ({city.country_code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}