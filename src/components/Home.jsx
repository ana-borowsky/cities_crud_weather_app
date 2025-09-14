import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CityCard from "./CityCard.jsx";
import Autor from "./Autor";
import Title from "./Title";
import { useToast } from "../context/ToastContext";
import "../Styles.css";

const HomePage = () => {
  const [allCities, setAllCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentCitySearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    const lastSearch = localStorage.getItem("lastCitySearch");
    if (lastSearch) {
      setCityInput(lastSearch);
    } else {
      setCityInput("Curitiba, London, Tokyo, New York, Belém, São Paulo");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentCitySearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cities");
        setAllCities(response.data);

        if (isInitialLoad) {
          const lastSearch = localStorage.getItem("lastCitySearch");
          if (lastSearch) {
            const cityNames = lastSearch.split(",").map((name) => name.trim());
            const filtered = response.data.filter((city) =>
              cityNames.includes(city.name)
            );
            setDisplayedCities(filtered);

            if (filtered.length === 0 && cityNames.length > 0) {
              addToast(`No cities found for: "${lastSearch}"`, "error");
            }
          } else {
            setDisplayedCities(response.data);
          }
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        addToast("Error loading cities.", "error");
      }
    };

    fetchAllCities();
  }, [addToast, isInitialLoad]);

  const handleFilterCities = () => {
    if (!cityInput.trim()) {
      addToast("Please enter at least one city name to search", "error");
      return;
    }

    const cityNames = cityInput.split(",").map((name) => name.trim());
    const filtered = allCities.filter((city) => cityNames.includes(city.name));
    setDisplayedCities(filtered);

    localStorage.setItem("lastCitySearch", cityInput);

    if (cityInput.trim()) {
      const newSearch = {
        query: cityInput,
        timestamp: new Date().toISOString(),
        resultsCount: filtered.length
      };

      setRecentSearches(prev => {
        const updated = [newSearch, ...prev.filter(item => item.query !== cityInput)];
        return updated.slice(0, 30);
      });
    }

    if (filtered.length === 0) {
      addToast(`No cities found for: "${cityInput}"`, "error");
    } else {
      addToast(`Found ${filtered.length} cities for your search`, "success");
    }
  };

  const showAllCities = () => {
    setDisplayedCities(allCities);
    setCityInput("");
    localStorage.removeItem("lastCitySearch");
    addToast("Showing all available cities", "success");
  };

  const loadRecentSearch = (searchQuery) => {
    setCityInput(searchQuery);
    const cityNames = searchQuery.split(",").map((name) => name.trim());
    const filtered = allCities.filter((city) => cityNames.includes(city.name));
    setDisplayedCities(filtered);

    localStorage.setItem("lastCitySearch", searchQuery);

    addToast(`Loaded recent search: "${searchQuery}"`, "info");
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentCitySearches");
    addToast("Recent searches cleared", "success");
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilterCities();
    }
  };

  return (
    <div className="container">
      <Title />

      <h3>
        <strong>Find the weather and time of cities around the world.</strong>
      </h3>

      <div className="input-container">
        <input
          type="text"
          value={cityInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ex: Paris, New York, Tokyo"
        />
        <button className="orange" onClick={handleFilterCities}>
          Search Cities
        </button>

        <button className="blue" onClick={showAllCities}>
          Show All Cities
        </button>

        <Link to="/cities" className="btn yellow">
          Manage Cities
        </Link>
      </div>

      {displayedCities.length > 0 ? (
        <div className="city-grid-container">
          {displayedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      ) : !isInitialLoad ? (
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
      ) : null}

      <Autor />
    </div>
  );
};

export default HomePage;