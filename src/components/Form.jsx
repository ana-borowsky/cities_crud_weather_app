import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form = ({ onEdit, setOnEdit, getCities }) => {
  const ref = useRef();
  const navigate = useNavigate();

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
      return console.error("Please fill in all fields!");
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
        await axios.put(`http://localhost:8800/${onEdit.id}`, cityData);
      } else {
        await axios.post("http://localhost:8800/", cityData);
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
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="form-container">
      <input name="name" placeholder="City Name" />
      <input name="country" placeholder="Country" />
      <input name="coord_lon" type="number" step="any" placeholder="Longitude" />
      <input name="coord_lat" type="number" step="any" placeholder="Latitude" />
      <input name="timezone_seconds" type="number" placeholder="Timezone (seconds)" />

      <div className="buttons">
        <button type="button" onClick={() => navigate('/')}>Back to Home</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Form;