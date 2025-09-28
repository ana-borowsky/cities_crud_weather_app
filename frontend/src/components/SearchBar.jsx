import { useState, useEffect } from "react";

const SearchBar = ({ handleFilterCities, initialValue }) => {
  const [cityInput, setCityInput] = useState("");

  useEffect(() => {
    setCityInput(initialValue)
  }, [initialValue])

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilterCities(cityInput);
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={cityInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Ex: Paris, New York, Tokyo"
      />
      <button className="orange" onClick={() => handleFilterCities(cityInput)}>
        Search Cities
      </button>
    </div>
  );
};

export default SearchBar;

