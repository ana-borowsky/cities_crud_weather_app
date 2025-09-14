import React from "react";
import { useNavigate } from "react-router-dom";
import CityForm from "./CityForm.jsx";
import Autor from "./Autor";
import Title from "./Title.jsx"; 
import "../Styles.css";

const AddCity = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/cities");
  };

  return (
    <div className="container">
      <Title />
      <h3 className="subtitle"><strong>Add New City</strong></h3>

      <CityForm onSuccess={handleSuccess} />

      <Autor />
    </div>
  );
};

export default AddCity;
