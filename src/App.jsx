import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from "./context/ToastContext";
import HomePage from "./components/Home.jsx";
import CityList from "./components/CityList.jsx"; // Nova página
import AddCity from "./components/AddCity.jsx";   // Nova página
import EditCity from "./components/EditCity.jsx"; // Nova página
import "./App.css";

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