const CityCard = ({ city, children }) => {

  const localTime =
    new Date(
      Date.now() +
      city.timezone_seconds * 1000 +
      new Date().getTimezoneOffset() * 60000
    ).toLocaleTimeString()

  const checkIfIsNight = () => {
    const now = new Date();
    const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTimestamp = utcTimestamp + city.timezone_seconds * 1000;
    const localTime = new Date(localTimestamp);
    const hours = localTime.getHours();

    return hours >= 18 || hours < 6
  };

  return (
    <div className={`city-card ${checkIfIsNight() ? "night-mode" : ""}`}>
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
