// CityManagement.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form.jsx";
import Grid from "./Grid.jsx";
import { useToast } from "../context/ToastContext";
import "../App.css";
import "../components/Form.css";
import "../components/Grid.css";

const CityManagement = () => {
  const [cities, setCities] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const { addToast } = useToast();

  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cities");
      setCities(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      console.error(error);
      addToast("Error loading cities", "error");
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Urban Weather</h1>
        <h2><strong>Manage the cities as you wish.</strong></h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCities={getCities} />
        <Grid cities={cities} setCities={setCities} setOnEdit={setOnEdit} />
        <h2>Made by Ana Paula Borowsky de Borba</h2>
      </div>
    </>
  );
};

export default CityManagement;