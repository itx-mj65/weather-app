import React, { useState } from 'react';
import axios from 'axios';
import '../component/CssWeather.css';
import cloudy from '../Picture/cloudy (1).png';
import cloudy1 from '../Picture/cloudy.png';
import cloud2 from '../Picture/sun.png';
import cloud3 from '../Picture/storm.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const API_KEY = '8bd8d47d534baa0e4a97043d6883b548'; // Make sure to replace this with your own API key

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            console.log(response.data);
            // Convert temperature from Kelvin to Celsius
            const temperatureInCelsius = response.data.main.temp - 273.15;
            response.data.main.temp = temperatureInCelsius;
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className='Container'>
            <div className="heading">
                <img src={cloudy1} alt="Cloude" />
                <img src={cloudy} alt="sun" />
                <h1>Weather To Day</h1>
                <img src={cloud2} alt="strom" />
                <img src={cloud3} alt="cloud3" />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleCityChange}
                    className="weather_input"
                    autoFocus
                /> <br />
                <div className="Buttons">
                    <button type="submit" className="get_weather_btn">Get Forecast</button>
                    {/* <input type="reset" className="get_weather_btn" value="Reset"  /> */}
                </div>
                {weatherData ? (
                    <div className='inner_container'>
                        <h1>{weatherData.name}</h1>
                        <p><b>Temperature:</b> <span className="opt_color">{weatherData.main.temp.toFixed(2)}°C</span></p>
                        <p><b>Description: </b> <span className="opt_color">{weatherData.weather[0].description}</span></p>
                        {weatherData.rain && <p>Rain: <span className="opt_color">{weatherData.rain['1h']} mm/h</span></p>}
                        {weatherData.snow && <p>Snow: <span className="opt_color">{weatherData.snow['1h']} mm/h</span></p>}
                        <p><b>Humidity: </b> <span className="opt_color">{weatherData.main.humidity}%</span></p>
                        <p><b>Sunrise:</b> <span className="opt_color">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
                        <p><b>Sunset:</b> <span className="opt_color">{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span></p>
                    </div>
                ) : (
                    <p></p>
                )}
            </form>
        </div>
    );
};

export default Weather;
