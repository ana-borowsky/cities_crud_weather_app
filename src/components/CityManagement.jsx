import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./CityForm.jsx";
import Grid from "./Grid.jsx";
import Autor from "./Autor";
import { useToast } from "../context/ToastContext";
import "../Styles.css";

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
        <h3 className="subtitle"><strong>Manage the cities as you wish.</strong></h3>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCities={getCities} />
        <Grid cities={cities} setCities={setCities} setOnEdit={setOnEdit} />
        <Autor />
      </div>
    </>
  );
};

export default CityManagement;