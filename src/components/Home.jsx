import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CityCard from "./CityCard.jsx";
import Autor from "./Autor";
import Toast from "./Toast";
import "../Styles.css";

const HomePage = () => {
  const [allCities, setAllCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [cityInput, setCityInput] = useState(
    "Curitiba, London, Tokyo, New York, Belém, São Paulo"
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cities");
        setAllCities(response.data);

        const cityNames = cityInput.split(",").map((name) => name.trim());
        const filtered = response.data.filter((city) =>
          cityNames.includes(city.name)
        );
        setDisplayedCities(filtered);

        if (filtered.length === 0) {
          setToast({
            message: `Nenhuma cidade encontrada para: "${cityInput}"`,
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setToast({ message: "Erro ao carregar cidades.", type: "error" });
      }
    };
    fetchAllCities();
  }, []);

  const handleFilterCities = () => {
    const cityNames = cityInput.split(",").map((name) => name.trim());
    const filtered = allCities.filter((city) => cityNames.includes(city.name));
    setDisplayedCities(filtered);

    if (filtered.length === 0) {
      setToast({
        message: `Nenhuma cidade encontrada para: "${cityInput}"`,
        type: "error",
      });
    }
  };

  const showAllCities = () => {
    setDisplayedCities(allCities);
    setCityInput("");
  };

  return (
    <div className="container">
      <h1>Urban Weather</h1>

      <h2>
        <strong>Find the weather and time of cities around the world.</strong>
      </h2>

      <div className="input-container">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
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
      ) : (
        <div className="sad-sun-container">
          <img
            src="/assets/sad_sun.svg"
            alt="Sad sun - no cities found"
            className="sad-sun-icon"
          />
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
