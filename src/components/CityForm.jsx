import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import { useToast } from "../context/ToastContext";
import "../Styles.css";

const CityForm = ({ city, onSuccess }) => {
  const ref = useRef();
  const navigate = useNavigate(); // Adicione esta linha
  const { addToast } = useToast();

  useEffect(() => {
    if (city) {
      const form = ref.current;
      form.name.value = city.name;
      form.country.value = city.country;
      form.coord_lon.value = city.coord_lon;
      form.coord_lat.value = city.coord_lat;
      form.timezone_seconds.value = city.timezone_seconds;
    }
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = ref.current;

    if (!form.name.value || !form.country.value) {
      addToast("Please fill in all required fields!", "error");
      return;
    }

    const cityData = {
      name: form.name.value,
      country: form.country.value,
      coord_lon: form.coord_lon.value,
      coord_lat: form.coord_lat.value,
      timezone_seconds: form.timezone_seconds.value,
    };

    try {
      if (city) {
        await axios.put(`http://localhost:8800/cities/${city.id}`, cityData);
        addToast(`City "${cityData.name}" updated successfully!`, "success");
      } else {
        await axios.post("http://localhost:8800/cities", cityData);
        addToast(`City "${cityData.name}" added successfully!`, "success");
      }

      if (!city) {
        form.reset();
      }

      if (onSuccess) {
        onSuccess();
      }

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
        <button className="orange" type="submit">
          {city ? "Update City" : "Add City"}
        </button>
        <button
          type="button" 
          className="btn blue"
          onClick={() => navigate('/cities')}
        >
          Back to Cities List
        </button>
      </div>
    </form>
  );
};

export default CityForm;