import { useWeatherContext } from "../context/WeatherContext";

export default function ClimaLocal({ onSearchClick }) {
  const { weatherData, selectCity } = useWeatherContext();
  const today = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = today.toLocaleDateString('en-GB', options);
  const handleSearch = (newLocation) => {
    selectCity(newLocation); 
    onSearchClick();
  };
  return (
    <section
      className="md:w-[30%] w-full h-screen sm:h-full md:h-screen bg-[#1e213a] relative overflow-hidden"
      style={{
        backgroundImage: 'url(/Cloud-background.png)',
        backgroundPosition: 'top',
        backgroundSize: '',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-[#1e213a] opacity-90"></div>
      <div className='p-10 w-full gap-10 flex flex-col relative z-10'>
        <div className='flex justify-between'>
          <button className='bg-gray-600 text-white p-2 cursor-pointer' onClick={() => handleSearch({ lat: -17.3833, lon: -66.1667 })}>
            Search for places
          </button>
          <figure className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center'>
            <img src="location.svg" alt="" className='w-6' />
          </figure>
        </div>
        {weatherData && (
          <div className='flex flex-col justify-center items-center gap-14'>
            <img src={`weather/${weatherData.weather[0].icon}.png`} alt="" className='w-40' />
            <div className='text-center text-slate-400 flex flex-col gap-9'>
              <div className='flex justify-center items-center'>
                <h2 className='text-8xl text-gray-50'>{Math.round(weatherData.main.temp - 273.15)}</h2>
                <h3 className='text-6xl'>°C</h3>
              </div>
              <h4 className='text-4xl font-semibold m-5'>{weatherData.weather[0].description}</h4>
              <h5>Today . <span id="current-date">{formattedDate}</span></h5>
              <div className='flex justify-center '>
                <img src="location_on.svg" alt="" className='w-5' />
                <h6>{weatherData.name}</h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 