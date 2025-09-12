import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Grid.css";

const Grid = ({ cities, setCities, setOnEdit }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${id}`);
      const newArray = cities.filter((city) => city.id !== id);
      setCities(newArray);
      console.log("City deleted successfully!");
    } catch (error) {
      console.error("Error deleting city:", error);
    }

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <div className="table-container">
      <table className="data-grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Timezone (seconds)</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cities.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.country}</td>
              <td>{item.coord_lon}</td>
              <td>{item.coord_lat}</td>
              <td>{item.timezone_seconds}</td>
              <td>
                <FaEdit onClick={() => handleEdit(item)} className="icon-edit" />
              </td>
              <td>
                <FaTrash onClick={() => handleDelete(item.id)} className="icon-delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;