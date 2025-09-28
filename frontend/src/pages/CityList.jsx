import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CitiesTable from "../containers/CitiesTable.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Layout from "../components/Layout.jsx"

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
    <Layout subtitle="Manage the cities as you wish">
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
        <CitiesTable cities={cities} setCities={setCities} getCities={getCities} />
      )}

    </Layout >
  );
};

export default CityList
