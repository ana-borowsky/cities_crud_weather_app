import React from "react";
import { useNavigate } from "react-router-dom";
import CityForm from "./CityForm.jsx";
import "../Styles.css";

const AddCity = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/cities"); 
  };

  return (
    <div className="container">
      <h1>Urban Weather</h1>
      <h2><strong>Add New City</strong></h2>

      <CityForm onSuccess={handleSuccess} />

      <h4>Made by Ana Paula Borowsky de Borba</h4>
    </div>
  );
};

export default AddCity;