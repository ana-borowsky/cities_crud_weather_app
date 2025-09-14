import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CityForm from "./CityForm.jsx";
import Autor from "./Autor";
import Title from "./Title.jsx"; // importando o componente Title
import { useToast } from "../context/ToastContext";
import "../Styles.css";

const EditCity = () => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/cities/${id}`);
        setCity(res.data);
      } catch (error) {
        console.error(error);
        addToast("Error loading city data", "error");
        navigate("/cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id, navigate, addToast]);

  const handleSuccess = () => {
    navigate("/cities");
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading city data...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Title />
      <h3 className="subtitle"><strong>Edit City: {city?.name}</strong></h3>

      <CityForm city={city} onSuccess={handleSuccess} />

      <Autor />
    </div>
  );
};

export default EditCity;
