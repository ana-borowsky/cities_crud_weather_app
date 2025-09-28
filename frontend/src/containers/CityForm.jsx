import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import "../Styles.css";

const CityForm = ({ city, onSuccess }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [errors, setErrors] = useState({});

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

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "City name is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    } else if (formData.country.length !== 2) {
      newErrors.country = "Country must be a 2-letter code (e.g., US, BR)";
    }

    if (formData.coord_lon === "" || formData.coord_lon === null) {
      newErrors.coord_lon = "Longitude is required";
    } else {
      const lon = parseFloat(formData.coord_lon);
      if (isNaN(lon) || lon < -180 || lon > 180) {
        newErrors.coord_lon = "Longitude must be between -180 and 180";
      }
    }

    if (formData.coord_lat === "" || formData.coord_lat === null) {
      newErrors.coord_lat = "Latitude is required";
    } else {
      const lat = parseFloat(formData.coord_lat);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.coord_lat = "Latitude must be between -90 and 90";
      }
    }

    if (formData.timezone_seconds === "" || formData.timezone_seconds === null) {
      newErrors.timezone_seconds = "Timezone is required";
    } else {
      const tz = parseInt(formData.timezone_seconds);
      if (isNaN(tz) || tz < -43200 || tz > 50400) {
        newErrors.timezone_seconds = "Timezone must be between -43200 and 50400 seconds";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = ref.current;

    const formData = {
      name: form.name.value,
      country: form.country.value,
      coord_lon: form.coord_lon.value,
      coord_lat: form.coord_lat.value,
      timezone_seconds: form.timezone_seconds.value,
    };

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      addToast("Please fix the errors in the form", "error");
      return;
    }

    const cityData = {
      name: formData.name.trim(),
      country: formData.country.trim().toUpperCase(),
      coord_lon: parseFloat(formData.coord_lon),
      coord_lat: parseFloat(formData.coord_lat),
      timezone_seconds: parseInt(formData.timezone_seconds),
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
        setErrors({});
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
      <div className="form-group">
        <input
          name="name"
          placeholder="City Name *"
          required
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          name="country"
          placeholder="Country Code (2 letters) *"
          required
          maxLength="2"
          className={errors.country ? 'error' : ''}
        />
        {errors.country && <span className="error-message">{errors.country}</span>}
      </div>

      <div className="form-group">
        <input
          name="coord_lon"
          type="number"
          step="any"
          placeholder="Longitude * (-180 to 180)"
          required
          className={errors.coord_lon ? 'error' : ''}
        />
        {errors.coord_lon && <span className="error-message">{errors.coord_lon}</span>}
      </div>

      <div className="form-group">
        <input
          name="coord_lat"
          type="number"
          step="any"
          placeholder="Latitude * (-90 to 90)"
          required
          className={errors.coord_lat ? 'error' : ''}
        />
        {errors.coord_lat && <span className="error-message">{errors.coord_lat}</span>}
      </div>

      <div className="form-group">
        <input
          name="timezone_seconds"
          type="number"
          placeholder="Timezone seconds * (-43200 to 50400)"
          required
          className={errors.timezone_seconds ? 'error' : ''}
        />
        {errors.timezone_seconds && <span className="error-message">{errors.timezone_seconds}</span>}
      </div>

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