import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from "./context/ToastContext";
import HomePage from "./containers/Home.jsx";
import CityList from "./containers/CityList.jsx";
import AddCity from "./containers/AddCity.jsx";
import EditCity from "./containers/EditCity.jsx";
import "./Styles.css";

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cities" element={<CityList />} />
          <Route path="/cities/add" element={<AddCity />} />
          <Route path="/cities/edit/:id" element={<EditCity />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;