import { useState, useEffect } from "react";
import "../Styles.css";

const CityCard = ({ city, weatherData, children }) => {
  const [isNight, setIsNight] = useState(false);

  const getLocalWeatherIcon = (iconCode) => {
    return `/assets/${iconCode}.svg`;
  };

  useEffect(() => {
    const checkIfIsNight = (timezoneOffset) => {
      const now = new Date();
      const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60000;
      const localTimestamp = utcTimestamp + timezoneOffset * 1000;
      const localTime = new Date(localTimestamp);
      const hours = localTime.getHours();

      setIsNight(hours >= 18 || hours < 6);
    };

    //checkIfIsNight(weatherData.timezone);
  }, []);

  const handleImageError = (e, iconCode) => {
    e.target.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

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

      {children}
      
    </div>
  );
};

export default CityCard;
