const WeatherInformation = ({ feelsLike, pressure, windspeed, humidity, temperature, description, icon }) => {

  const getLocalWeatherIcon = (iconCode) => {
    return `/assets/${iconCode}.svg`;
  };

  return (
    <div>
      <div className="image">
        <img
          src={getLocalWeatherIcon(icon)}
          alt={description}
          className="weather-icon"
          onError={(e) => handleImageError(e, icon)}
        />
      </div>
      <p>
        <strong>Temperature:</strong> {temperature} °C
      </p>
      <p>
        <strong>Feels Like:</strong> {feelsLike} °C
      </p>
      <p>
        <strong>Condition:</strong> {description}
      </p>
      <p>
        <strong>Humidity:</strong> {humidity} %
      </p>
      <p>
        <strong>Wind:</strong> {windspeed} m/s
      </p>
      <p>
        <strong>Pressure:</strong> {pressure} hPa
      </p>
    </div>
  );
};

export default WeatherInformation;