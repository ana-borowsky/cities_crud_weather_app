import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from "./context/ToastContext";
import HomePage from "./pages/Home.jsx";
import CityList from "./pages/CityList.jsx";
import AddCity from "./pages/AddCity.jsx";
import EditCity from "./pages/EditCity.jsx";

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