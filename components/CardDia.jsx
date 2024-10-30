// CardDia.js
import React from 'react';

export default function CardDia({ date, icon, tempMax, tempMin }) {
  return (
    <section className='w-32 h-40 text-white flex flex-col gap-3 text-center items-center justify-between bg-[#1e213a] p-3'>
      <h4>{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</h4>
      <figure className='w-14'>
        <img src={`weather/${icon}.png`} alt="weather icon" />
      </figure>
      <h4>{Math.round(tempMax)}°C / {Math.round(tempMin)}°C</h4>
    </section>
  );
}
