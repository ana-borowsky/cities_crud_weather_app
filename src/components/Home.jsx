import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import CityCard from "./CityCard.jsx";
import './Home.css';

const HomePage = () => {
  const [allCities, setAllCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [cityInput, setCityInput] = useState('Curitiba, London, Tokyo, New York, Santiago, Buenos Aires');

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await axios.get("http://localhost:8800/");
        setAllCities(response.data);
        const cityNames = cityInput.split(',').map(name => name.trim());
        const filtered = response.data.filter(city => cityNames.includes(city.name));
        setDisplayedCities(filtered);
      } catch (error) {
        console.error("Erro ao buscar as cidades:", error);
      }
    };
    fetchAllCities();
  }, []);

  const handleFilterCities = () => {
    const cityNames = cityInput.split(',').map(name => name.trim());
    const filtered = allCities.filter(city => cityNames.includes(city.name));
    setDisplayedCities(filtered);
  };

  return (
    <div className="container">
      <h1>ClimaMundo</h1>
      <div><p>Digite os nomes das cidades que você deseja ver separados por vírgula e em inglês:</p></div>
      <div className="input-container">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Ex: Paris, New York, Tokyo"
        />
        <button onClick={handleFilterCities}>
          Mostrar Cidades
        </button>
      </div>

      <div className="city-grid-container">
        {displayedCities.length > 0 ? (
          displayedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))
        ) : (
          <p>Nenhuma cidade encontrada ou carregando...</p>
        )}
      </div>
      <Link to="/cities" className="manage-cities-btn">
        Ir para Gerenciamento de Cidades
      </Link>
    </div>
  );
};

export default HomePage;
