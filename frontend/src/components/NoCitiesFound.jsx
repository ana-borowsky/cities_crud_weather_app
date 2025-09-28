const NoCitiesFound = () => {
  return (
    <div className="sad-sun-container">
      <img
        src="/assets/sad_sun.svg"
        alt="Sad sun - no cities found"
        className="sad-sun-icon"
      />
      <p className="smaller">
        <strong>
          Try searching for another city or add it to the database.
        </strong>
      </p>
    </div>
  );
};

export default NoCitiesFound;
