import { FaTrash, FaEdit } from "react-icons/fa"

const CitiesTable = ({ cities, handleDelete, handleEdit }) => {
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
            <th>Actions</th>
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
                <div className="action-buttons">
                  <FaEdit
                    onClick={() => handleEdit(item)}
                    className="icon-edit"
                    title="Edit city"
                  />
                  <FaTrash
                    onClick={() => handleDelete(item.id, item.name)}
                    className="icon-delete"
                    title="Delete city"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;


