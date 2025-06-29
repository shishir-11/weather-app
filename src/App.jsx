import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [city,setCity] = useState('london');
  return (
    <div className='app'>
      <SearchBar city={city} setCity={setCity}/>
      <WeatherCard city={city}/>
    </div>
  );
}

export default App;
