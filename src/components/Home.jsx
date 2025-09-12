import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import CityCard from "./CityCard.jsx";

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
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo ao App de Gerenciamento de Cidades!</h1>
      <p>Digite os nomes das cidades que você deseja ver (separados por vírgula):</p>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Ex: Paris, New York, Tokyo"
          style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleFilterCities}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            marginLeft: '10px',
            cursor: 'pointer'
          }}
        >
          Mostrar Cidades
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {displayedCities.length > 0 ? (
          displayedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))
        ) : (
          <p>Nenhuma cidade encontrada ou carregando...</p>
        )}
      </div>
      <Link to="/cities" style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '15px 25px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        borderRadius: '8px',
        marginTop: '50px'
      }}>
        Ir para Gerenciamento de Cidades
      </Link>
    </div>
  );
};

export default HomePage;
