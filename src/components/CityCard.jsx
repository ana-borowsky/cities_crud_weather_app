import React from "react";
import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  return (
    <div style={{
      backgroundColor: '#e9e9e9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'left'
    }}>
      <h3>{city.name}, {city.country}</h3>
      <p><strong>Latitude:</strong> {city.coord_lat}</p>
      <p><strong>Longitude:</strong> {city.coord_lon}</p>
      <Link to={`/cities/${city.id}`} style={{ color: '#4CAF50', textDecoration: 'none' }}>
        Ver Detalhes
      </Link>
    </div>
  );
};

export default CityCard;
