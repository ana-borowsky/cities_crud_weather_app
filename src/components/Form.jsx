// Form.jsx
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import "./Form.css";

const Form = ({ onEdit, setOnEdit, getCities }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    if (onEdit) {
      const city = ref.current;
      city.name.value = onEdit.name;
      city.country.value = onEdit.country;
      city.coord_lon.value = onEdit.coord_lon;
      city.coord_lat.value = onEdit.coord_lat;
      city.timezone_seconds.value = onEdit.timezone_seconds;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const city = ref.current;

    if (!city.name.value || !city.country.value) {
      addToast("Please fill in all required fields!", "error");
      return;
    }

    const cityData = {
      name: city.name.value,
      country: city.country.value,
      coord_lon: city.coord_lon.value,
      coord_lat: city.coord_lat.value,
      timezone_seconds: city.timezone_seconds.value,
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/cities/${onEdit.id}`, cityData);
        addToast(`City "${cityData.name}" updated successfully!`, "success");
      } else {
        await axios.post("http://localhost:8800/cities", cityData);
        addToast(`City "${cityData.name}" added successfully!`, "success");
      }

      city.name.value = "";
      city.country.value = "";
      city.coord_lon.value = "";
      city.coord_lat.value = "";
      city.timezone_seconds.value = "";

      setOnEdit(null);
      getCities();

    } catch (error) {
      console.error("Error saving city:", error);
      addToast("Error saving city. Please try again.", "error");
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="form-container">
      <input name="name" placeholder="City Name" required />
      <input name="country" placeholder="Country" required />
      <input name="coord_lon" type="number" step="any" placeholder="Longitude" />
      <input name="coord_lat" type="number" step="any" placeholder="Latitude" />
      <input name="timezone_seconds" type="number" placeholder="Timezone (seconds)" />

      <div className="buttons">
        <button className="back-btn" type="button" onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button type="submit">
          {onEdit ? "Update City" : "Add City"}
        </button>
      </div>
    </form>
  );
};

export default Form;