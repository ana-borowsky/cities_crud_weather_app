import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles.css";

const CityCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'b7ffc9f8c3a6364da5b4124625785d0e';

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city.coord_lat || !city.coord_lon) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord_lat}&lon=${city.coord_lon}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const timezoneHours = weatherData ? weatherData.timezone / 3600 : null;
  const localTime = weatherData
    ? new Date(Date.now() + (weatherData.timezone * 1000) + (new Date().getTimezoneOffset() * 60000)).toLocaleTimeString()
    : null;

  return (
    <div className="city-card">
      {/* Display database data */}
      <h3>{city.name}, {city.country}</h3>
      <h4><strong>Local Time:</strong> {localTime}</h4><br></br>
      <p className="smaller"><strong>Longitude:</strong> {city.coord_lon}</p>
      <p className="smaller"><strong>Latitude:</strong> {city.coord_lat}</p>
      <p className="smaller"><strong>Timezone:</strong> {city.timezone_seconds / 3600} hours</p>

      {/* Section for weather data, which is loaded via API */}
      <hr className="separator" />
      <h4>Weather Information:</h4>
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div>
          <div className="image">
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="weather-icon"
            />
          </div>
          <p><strong>Temperature:</strong> {weatherData.main.temp.toFixed(1)} °C</p>
          <p><strong>Feels Like:</strong> {weatherData.main.feels_like.toFixed(1)} °C</p>
          <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
          <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
        </div>
      ) : (
        <p>Weather data not available.</p>
      )}
    </div>
  );
};

export default CityCard;