import React, { useRef, useEffect } from "react";
import axios from "axios";
import "./Form.css";

const Form = ({ onEdit, setOnEdit, getCities }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const city = ref.current;

      city.name.value = onEdit.name;
      city.country.value = onEdit.country;
      city.coord_lon.value = onEdit.coord_lon;
      city.coord_lat.value = onEdit.coord_lat;
      city.timezone_seconds.value = onEdit.timezone_seconds;
      city.cod.value = onEdit.cod;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const city = ref.current;

    if (!city.name.value || !city.country.value) {
      return alert("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios.put("http://localhost:8800/cities/" + onEdit.id, {
        name: city.name.value,
        country: city.country.value,
        coord_lon: city.coord_lon.value,
        coord_lat: city.coord_lat.value,
        timezone_seconds: city.timezone_seconds.value,
        cod: city.cod.value,
      });
    } else {
      await axios.post("http://localhost:8800/cities", {
        name: city.name.value,
        country: city.country.value,
        coord_lon: city.coord_lon.value,
        coord_lat: city.coord_lat.value,
        timezone_seconds: city.timezone_seconds.value,
        cod: city.cod.value,
      });
    }

    city.name.value = "";
    city.country.value = "";
    city.coord_lon.value = "";
    city.coord_lat.value = "";
    city.timezone_seconds.value = "";
    city.cod.value = "";

    setOnEdit(null);
    getCities();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="form-container">
      <input name="name" placeholder="Nome da Cidade" />
      <input name="country" placeholder="País" />
      <input name="coord_lon" type="number" placeholder="Longitude" />
      <input name="coord_lat" type="number" placeholder="Latitude" />
      <input name="timezone_seconds" type="number" placeholder="Fuso Horário (s)" />

      <button type="submit">Salvar</button>
    </form>
  );
};

export default Form;
