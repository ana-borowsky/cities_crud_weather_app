import React from "react";
import { useNavigate } from "react-router-dom";
import CityForm from "./CityForm.jsx";
import "../App.css";
import "../components/Form.css";

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

      <button
        className="back-btn"
        onClick={() => navigate('/cities')}
        style={{ marginTop: '20px' }}
      >
        Back to Cities List
      </button>

      <h2>Made by Ana Paula Borowsky de Borba</h2>
    </div>
  );
};

export default AddCity;