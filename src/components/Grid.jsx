import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import "./Grid.css";

const Grid = ({ cities, setCities, setOnEdit }) => {
  const { addToast } = useToast();

  const handleDelete = async (id, cityName) => {
    try {
      await axios.delete(`http://localhost:8800/cities/${id}`);
      const newArray = cities.filter((city) => city.id !== id);
      setCities(newArray);
      addToast(`City "${cityName}" deleted successfully!`, "success");
    } catch (error) {
      console.error("Error deleting city:", error);
      addToast("Error deleting city. Please try again.", "error");
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
                <FaEdit
                  onClick={() => handleEdit(item)}
                  className="icon-edit"
                  title="Edit city"
                />
              </td>
              <td>
                <FaTrash
                  onClick={() => handleDelete(item.id, item.name)}
                  className="icon-delete"
                  title="Delete city"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;