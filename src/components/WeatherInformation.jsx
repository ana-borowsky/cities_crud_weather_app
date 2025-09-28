const WeatherInformation = ({ weatherData }) => {

  const getLocalWeatherIcon = (iconCode) => {
    return `/assets/${iconCode}.svg`;
  };

  return (
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
  );
};

export default WeatherInformation;