import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "./Grid.jsx";
import Autor from "./Autor";
import { useToast } from "../context/ToastContext";
import "../Styles.css";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const getCities = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8800/cities");
      setCities(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      console.error(error);
      addToast("Error loading cities", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className="container">
      <h1>Urban Weather</h1>
      <h2><strong>Manage the cities as you wish.</strong></h2>

      <div className="action-buttons">
        <Link to="/cities/add" className="btn orange">
          Add New City
        </Link>
        <Link to="/" className="btn blue">
          Back to Home
        </Link>
      </div>

      {loading ? (
        <p>Loading cities...</p>
      ) : (
        <Grid cities={cities} setCities={setCities} getCities={getCities} />
      )}

      <Autor />
    </div>
  );
};

export default CityList;