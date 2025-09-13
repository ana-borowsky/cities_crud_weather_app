import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles.css";

// Importe todas as imagens que você precisa
import Clear from "../assets/01d.svg";
import ClearNight from "../assets/01n.svg";
import FewClouds from "../assets/02d.svg";
import FewCloudsNight from "../assets/02n.svg";
import ScatteredClouds from "../assets/03d.svg";
import ScatteredCloudsNight from "../assets/03n.svg";
import BrokenClouds from "../assets/04d.svg";
import BrokenCloudsNight from "../assets/04n.svg";
import ShowerRain from "../assets/09d.svg";
import ShowerRainNight from "../assets/09n.svg";
import Rain from "../assets/10d.svg";
import RainNight from "../assets/10n.svg";
import Thunderstorm from "../assets/11d.svg";
import ThunderstormNight from "../assets/11n.svg";
import Snow from "../assets/13d.svg";
import SnowNight from "../assets/13n.svg";
import Mist from "../assets/50d.svg";
import MistNight from "../assets/50n.svg";

const CityCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'b7ffc9f8c3a6364da5b4124625785d0e';

  // Mapeamento dos ícones para imagens locais
  const weatherIcons = {
    "01d": Clear,
    "01n": ClearNight,
    "02d": FewClouds,
    "02n": FewCloudsNight,
    "03d": ScatteredClouds,
    "03n": ScatteredCloudsNight,
    "04d": BrokenClouds,
    "04n": BrokenCloudsNight,
    "09d": ShowerRain,
    "09n": ShowerRainNight,
    "10d": Rain,
    "10n": RainNight,
    "11d": Thunderstorm,
    "11n": ThunderstormNight,
    "13d": Snow,
    "13n": SnowNight,
    "50d": Mist,
    "50n": MistNight
  };

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

  // Obter a imagem local baseada no ícone da API
  const getLocalWeatherIcon = (iconCode) => {
    return weatherIcons[iconCode] || Clear;
  };

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
              src={getLocalWeatherIcon(weatherData.weather[0].icon)}
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