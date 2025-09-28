import { useState, useEffect } from "react";
import axios from "axios";
import CityCard from "../containers/CityCard.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Layout from "../components/Layout.jsx"
import SearchBar from "../components/SearchBar.jsx"
import { Link } from "react-router-dom";
import NoCitiesFound from "../components/NoCitiesFound.jsx";

const HomePage = () => {
  const [allCities, setAllCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [lastCitySearch, setLastCitySearch] = useState("");
  const { addToast } = useToast();

  const showAllCities = () => {
    setDisplayedCities(allCities);
    localStorage.removeItem("lastCitySearch");
    setLastCitySearch("");
    addToast("Showing all available cities", "success");
  };

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
            setLastCitySearch(lastSearch);
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
  }, []);

  const handleFilterCities = (cityInput) => {
    if (!cityInput.trim()) {
      addToast("Please enter at least one city name to search", "error");
      return;
    }

    const cityNames = cityInput.split(",").map((name) => name.trim());
    const filtered = allCities.filter((city) => cityNames.includes(city.name));
    setDisplayedCities(filtered);

    localStorage.setItem("lastCitySearch", cityInput);

    if (filtered.length === 0) {
      addToast(`No cities found for: "${cityInput}"`, "error");
    } else {
      addToast(`Found ${filtered.length} cities for your search`, "success");
    }
  };

  return (
    <Layout subtitle={"Find the weather and time of cities around the world."}>
      <div className="input-container">
        <SearchBar initialValue={lastCitySearch} handleFilterCities={handleFilterCities} />
        <div className="home-btns">
          <button className="blue" onClick={showAllCities}>
            Show All Cities
          </button>

          <Link to="/cities" className="btn yellow">
            Manage Cities
          </Link>
        </div>
      </div>

      {displayedCities.length > 0 ? (
        <div className="city-grid-container">
          {displayedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      ) : !isInitialLoad ? (
        <NoCitiesFound />
      ) : null}
    </Layout >
  );
};

export default HomePage;