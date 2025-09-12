import React, { useState, useEffect } from "react";
import axios from "axios";

const CityCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'YOUR_API_KEY';

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city.coord_lat || !city.coord_lon) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord_lat}&lon=${city.coord_lon}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const timezoneHours = weatherData ? weatherData.timezone / 3600 : null;
  const localTime = weatherData
    ? new Date((new Date().getTime() / 1000 + weatherData.timezone - new Date().getTimezoneOffset() * 60) * 1000).toLocaleTimeString()
    : null;

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'left'
    }}>
      {/* Exibe os dados do banco de dados */}
      <h3>{city.name}, {city.country}</h3>
      <p><strong>Longitude:</strong> {city.coord_lon}</p>
      <p><strong>Latitude:</strong> {city.coord_lat}</p>
      <p><strong>Fuso Horário:</strong> {city.timezone_seconds / 3600} horas</p>

      {/* Seção para os dados do clima, que são carregados via API */}
      <hr style={{ margin: '15px 0' }} />
      <h4>Informações do Clima:</h4>
      {loading ? (
        <p>Carregando dados do clima...</p>
      ) : weatherData ? (
        <div>
          <p><strong>Horário Local:</strong> {localTime}</p>
          <p><strong>Temperatura:</strong> {weatherData.main.temp.toFixed(1)} °C</p>
          <p><strong>Sensação Térmica:</strong> {weatherData.main.feels_like.toFixed(1)} °C</p>
          <p><strong>Condição:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Umidade:</strong> {weatherData.main.humidity} %</p>
          <p><strong>Vento:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Pressão:</strong> {weatherData.main.pressure} hPa</p>
        </div>
      ) : (
        <p>Dados do clima não disponíveis.</p>
      )}
    </div>
  );
};

export default CityCard;
