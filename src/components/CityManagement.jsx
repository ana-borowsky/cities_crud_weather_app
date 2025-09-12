import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Form from "./Form.jsx";
import Grid from "./Grid.jsx";
import "../App.css";
import "../components/Form.css";
import "../components/Grid.css";

const CityManagement = () => {
  const [cities, setCities] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8800/");
      setCities(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Urban Wheather</h1>
        <p>Manage the cities as you wish.</p>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCities={getCities} />
        <Grid cities={cities} setCities={setCities} setOnEdit={setOnEdit} />
      </div>
    </>
  );
};

export default CityManagement;
