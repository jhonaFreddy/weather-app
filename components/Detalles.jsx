import React from 'react'
import { useWeatherContext } from '@/context/WeatherContext';

export default function detalles() {
  const { weatherData } = useWeatherContext();
  return (
    <section className='flex gap-5 flex-wrap justify-center'>
      <div className='w-80 h-48 bg-[#1e213a] text-white items-center flex flex-col gap-5 p-2'>
        <h4 className='text-xl font-thin'>Wind status</h4>
        <div className='flex items-center'>
          <h3 className='text-6xl font-semibold'>{weatherData?.wind?.speed || ""}</h3><h4 className='text-4xl font-extralight'>m/s</h4>
        </div>
        <div className='flex gap-3'>
          <figure className={'bg-slate-600 rounded-full w-8 h-8 flex justify-center'}>
            <img src="navigation.svg" alt="" className={'w-6'} style={{ transform: `rotate(${weatherData?.wind?.deg || 0}deg)` }} />
          </figure>
          <h4 className='text-xl font-thin'>{(() => {
            const deg = weatherData?.wind?.deg || 0;
            if (deg >= 337.5 || deg < 22.5) return 'N';
            if (deg >= 22.5 && deg < 67.5) return 'NE';
            if (deg >= 67.5 && deg < 112.5) return 'E';
            if (deg >= 112.5 && deg < 157.5) return 'SE';
            if (deg >= 157.5 && deg < 202.5) return 'S';
            if (deg >= 202.5 && deg < 247.5) return 'SW';
            if (deg >= 247.5 && deg < 292.5) return 'W';
            if (deg >= 292.5 && deg < 337.5) return 'NW';
            return 'N';
          })()}</h4>
        </div>
      </div>
      <div className='w-80 h-48 bg-[#1e213a] text-white items-center flex flex-col gap-5 p-2'>
        <h4 className='text-xl font-thin'>Humidity</h4>
        <div className='flex items-center'>
          <h3 className='text-6xl font-semibold'>{weatherData?.main?.humidity || ""}</h3><h4 className='text-4xl font-extralight'>%</h4>
        </div>
        <div className='w-full px-10'>
          <div className='flex  justify-between'>
            <h6>0</h6>
            <h6>50</h6>
            <h6>100</h6>
          </div>
          <div className="w-full h-2 rounded-md bg-white">
            <div className="h-2 rounded-md bg-yellow-300" style={{ width: `${weatherData?.main?.humidity}%` }}></div>
          </div>
        </div>
      </div>
      <div className='w-80 h-[153px] bg-[#1e213a] text-white items-center flex flex-col gap-5 pt-2'>
        <h4 className='text-xl font-thin'>Visibility</h4>
        <div className='flex items-center'>
          <h3 className='text-6xl font-semibold'>{(weatherData?.visibility / 1000) || ""}.00</h3><h4 className='text-4xl font-extralight'>km</h4>
        </div>
      </div>
      <div className='w-80 h-[153px] bg-[#1e213a] text-white items-center flex flex-col gap-5 pt-2'>
        <h4 className='text-xl font-thin'>Air Pressure</h4>
        <div className='flex items-center'>
          <h3 className='text-6xl font-semibold'>{weatherData?.main?.pressure || ""}</h3><h4 className='text-4xl font-extralight'>mb</h4>
        </div>
      </div>
    </section>
  )
}
