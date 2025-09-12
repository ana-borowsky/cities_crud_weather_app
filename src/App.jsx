import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form.jsx";
import Grid from "./components/Grid.jsx";
import "./App.css";
import "./components/Form.css";
import "./components/Grid.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/Home.jsx";

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
    getCities(); cities
  }, []);

  return (
    <>
      <div className="container">
        <h1>Gerencie as Cidades</h1>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCities={getCities} />
        <Grid cities={cities} setCities={setCities} setOnEdit={setOnEdit} />
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities" element={<CityManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
