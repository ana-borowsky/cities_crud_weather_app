import React from "react";
import { useNavigate } from "react-router-dom";
import CityForm from "../containers/CityForm.jsx";
import "../Styles.css";
import Layout from "../components/Layout.jsx";

const AddCity = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/cities");
  };

  return (
    <Layout>
      <h3 className="subtitle"><strong>Add New City</strong></h3>

      <CityForm onSuccess={handleSuccess} />
    </Layout>
  );
};

export default AddCity;
