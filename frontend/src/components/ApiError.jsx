const ApiError = ({ errorMessage }) => {
  return (
    <div className="weather-error">
      <div className="image">
        <img
          src="/assets/sad_sun.svg"
          alt="Sad sun - city not found"
          className="weather-icon"
        />
      </div>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ApiError;