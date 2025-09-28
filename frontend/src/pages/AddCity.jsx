import { useNavigate } from "react-router-dom";
import CityForm from "../containers/CityForm.jsx";
import Layout from "../components/Layout.jsx";

const AddCity = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/cities");
  };

  return (
    <Layout subtitle={"Add new city"}>

      <CityForm onSuccess={handleSuccess} />
    </Layout>
  );
};

export default AddCity;
