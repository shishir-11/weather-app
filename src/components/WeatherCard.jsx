import React ,{useEffect, useState} from 'react';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import rain from '../assets/rain.png';

const URL = import.meta.env.VITE_SERVER_URL+'/weather?city=';
const WeatherCard = ({city}) => {
    const [weather,setWeather] = useState(null)
    const conditionImages = {
        clear,
        cloud,
        drizzle,
        snow,
        wind,
        rain
    };

    useEffect(()=>{
        const loadData = async () =>{
            try{
                const res = await fetch(URL+city);
                const data = await res.json();
                setWeather(data);
            }catch(err){
                console.log(err);
            }
        }
        loadData();
    },[city]);

    if(!weather) return <p>Loading weather...</p>

    return (
    <div className="weather-card">
      <img src={conditionImages[weather.condition] || clear} alt="Weather Icon" className="weather-icon" />
      <h1 className="temperature">{weather.temperature}°C</h1>
      <h2 className="location">{weather.city}</h2>

      <div className="details">
        <div className="detail">
          <img src={rain} alt="Humidity" className="detail-icon" />
          <p>{weather.humidity}%</p>
          <span>Humidity</span>
        </div>

        <div className="detail">
          <img src={wind} alt="Wind Speed" className="detail-icon" />
          <p>{weather.wind} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
    );
}

export default WeatherCard;
