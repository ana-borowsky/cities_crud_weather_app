import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/Home.jsx";
import CityManagement from "./components/CityManagement.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities" element={<CityManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
