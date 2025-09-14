import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CityCard from "./CityCard.jsx";
import Autor from "./Autor";
import Toast from "./Toast";
import Title from "./Title";
import "../Styles.css";

const HomePage = () => {
  const [allCities, setAllCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [toast, setToast] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

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
    if (cityInput) {
      localStorage.setItem("lastCitySearch", cityInput);
    }
  }, [cityInput]);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cities");
        setAllCities(response.data);

        const searchQuery = cityInput || localStorage.getItem("lastCitySearch") || "Curitiba, London, Tokyo, New York, Belém, São Paulo";
        const cityNames = searchQuery.split(",").map((name) => name.trim());

        const filtered = response.data.filter((city) =>
          cityNames.includes(city.name)
        );
        setDisplayedCities(filtered);

        if (filtered.length === 0 && cityNames.length > 0) {
          setToast({
            message: `No cities found for: "${searchQuery}"`,
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setToast({ message: "Error loading cities.", type: "error" });
      }
    };
    fetchAllCities();
  }, []);

  const handleFilterCities = () => {
    const cityNames = cityInput.split(",").map((name) => name.trim());
    const filtered = allCities.filter((city) => cityNames.includes(city.name));
    setDisplayedCities(filtered);

    if (cityInput.trim()) {
      const newSearch = {
        query: cityInput,
        timestamp: new Date().toISOString(),
        resultsCount: filtered.length
      };

      setRecentSearches(prev => {
        const updated = [newSearch, ...prev.filter(item => item.query !== cityInput)];
        return updated.slice(0, 5);
      });
    }

    if (filtered.length === 0) {
      setToast({
        message: `No cities found for: "${cityInput}"`,
        type: "error",
      });
    } else {
      setToast({
        message: `Found ${filtered.length} cities for your search`,
        type: "success",
      });
    }
  };

  const showAllCities = () => {
    setDisplayedCities(allCities);
    setCityInput("");
    setToast({
      message: "Showing all available cities",
      type: "success",
    });
  };

  const loadRecentSearch = (searchQuery) => {
    setCityInput(searchQuery);
    const cityNames = searchQuery.split(",").map((name) => name.trim());
    const filtered = allCities.filter((city) => cityNames.includes(city.name));
    setDisplayedCities(filtered);

    setToast({
      message: `Loaded recent search: "${searchQuery}"`,
      type: "info",
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentCitySearches");
    setToast({
      message: "Recent searches cleared",
      type: "success",
    });
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
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Ex: Paris, New York, Tokyo"
          onKeyPress={(e) => e.key === 'Enter' && handleFilterCities()}
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
      ) : (
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
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={4000}
        />
      )}

      <Autor />
    </div>
  );
};

export default HomePage;