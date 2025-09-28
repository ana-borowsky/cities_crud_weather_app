import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import "../Styles.css"
import CitiesTable from "../components/CitiesTable"

const Grid = ({ cities, setCities, getCities }) => {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const handleDelete = async (id, cityName) => {
    if (window.confirm(`Are you sure you want to delete "${cityName}"?`)) {
      try {
        await axios.delete(`http://localhost:8800/cities/${id}`)
        const newArray = cities.filter((city) => city.id !== id)
        setCities(newArray)
        addToast(`City "${cityName}" deleted successfully!`, "success")
        getCities()
      } catch (error) {
        console.error("Error deleting city:", error)
        addToast("Error deleting city. Please try again.", "error")
      }
    }
  };

  const handleEdit = (item) => {
    navigate(`/cities/edit/${item.id}`)
  };

  return (
    <CitiesTable 
      handleEdit={handleEdit} 
      handleDelete={handleDelete}
      cities={cities}
      />
  )
}

export default Grid