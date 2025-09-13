import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles.css";

const CityCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [apiError, setApiError] = useState(null);

  const API_KEY = "b7ffc9f8c3a6364da5b4124625785d0e";

  const getLocalWeatherIcon = (iconCode) => {
    return `/assets/${iconCode}.svg`;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setApiError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${API_KEY}&units=metric`
        );

        if (response.data.cod === "404") {
          setApiError("No weather data available for this location.");
          setWeatherData(null);
        } else {
          setWeatherData(response.data);
          checkIfIsNight(response.data.timezone);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.cod === "404"
        ) {
          setApiError("No weather data available for this location.");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setApiError(`Weather API error: ${error.response.data.message}`);
        } else {
          setApiError("Error fetching weather data. Please try again later.");
        }
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    const checkIfIsNight = (timezoneOffset) => {
      const now = new Date();
      const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60000;
      const localTimestamp = utcTimestamp + timezoneOffset * 1000;
      const localTime = new Date(localTimestamp);
      const hours = localTime.getHours();

      setIsNight(hours >= 18 || hours < 6);
    };

    fetchWeather();
  }, [city]);

  const handleImageError = (e, iconCode) => {
    e.target.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const timezoneHours = weatherData ? weatherData.timezone / 3600 : null;
  const localTime = weatherData
    ? new Date(
      Date.now() +
      weatherData.timezone * 1000 +
      new Date().getTimezoneOffset() * 60000
    ).toLocaleTimeString()
    : null;

  return (
    <div className={`city-card ${isNight ? "night-mode" : ""}`}>
      <h3>
        {city.name}, {city.country}
      </h3>
      <h4>
        <strong>Local Time:</strong> {localTime}
      </h4>
      <p className="smaller">
        <strong>Longitude:</strong> {city.coord_lon}
      </p>
      <p className="smaller">
        <strong>Latitude:</strong> {city.coord_lat}
      </p>
      <p className="smaller">
        <strong>Timezone:</strong> {city.timezone_seconds / 3600} hours
      </p>

      <hr className="separator" />
      <h4>Weather Information:</h4>

      {loading ? (
        <p>Loading weather data...</p>
      ) : apiError ? (
        <div className="weather-error">
            <div className="image">
              <img
                src="/assets/sad_sun.svg"
                alt="Sad sun - city not found"
                className="weather-icon"
              />
            </div>
          <p>{apiError}</p>
        </div>
      ) : weatherData ? (
        <div>
          <div className="image">
            <img
              src={getLocalWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="weather-icon"
              onError={(e) => handleImageError(e, weatherData.weather[0].icon)}
            />
          </div>
          <p>
            <strong>Temperature:</strong> {weatherData.main.temp.toFixed(1)} °C
          </p>
          <p>
            <strong>Feels Like:</strong>{" "}
            {weatherData.main.feels_like.toFixed(1)} °C
          </p>
          <p>
            <strong>Condition:</strong> {weatherData.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.main.humidity} %
          </p>
          <p>
            <strong>Wind:</strong> {weatherData.wind.speed} m/s
          </p>
          <p>
            <strong>Pressure:</strong> {weatherData.main.pressure} hPa
          </p>
        </div>
      ) : (
        <p>Weather data not available.</p>
      )}
    </div>
  );
};

export default CityCard;
