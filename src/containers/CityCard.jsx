import { useState, useEffect } from "react"
import axios from "axios"
import "../Styles.css"
import CityCardComponent from "../components/CityCard"
import ApiError from "../components/ApiError"
import WeatherInformation from "../components/WeatherInformation"
const CityCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  const API_KEY = "b7ffc9f8c3a6364da5b4124625785d0e"


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setApiError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${API_KEY}&units=metric`
        );

        if (response.data.cod === "404") {
          setApiError("No weather data available for this location.");
          setWeatherData(null);
        } else {
          setWeatherData(response.data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.cod === "404"
        ) {
          setApiError("No weather data found for this location. Please check the city or country name and try again.");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setApiError(`Weather API error: ${error.response.data.message}`);
        } else {
          setApiError("Error fetching weather data. Please try again later.");
        }
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return <CityCardComponent city={city}>
    {loading ? (
      <p>Loading weather data...</p>
    ) : apiError ? (
        <ApiError errorMessage={apiError} />
    ) : weatherData ? (
          <WeatherInformation 
            description={weatherData.weather[0].description}
            temperature={weatherData.main.temp.toFixed(1)}
            feelsLike={weatherData.main.feels_like.toFixed(1)}
            humidity={weatherData.main.humidity}
            windspeed={weatherData.wind.speed}
            pressure={weatherData.main.pressure}
            icon={weatherData.weather[0].icon}
            />
    ) : (
      <p>Weather data not available.</p>
    )}
  </CityCardComponent>
};

export default CityCard;
