import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from "./context/ToastContext";
import HomePage from "./components/Home.jsx";
import CityManagement from "./components/CityManagement.jsx";
import "./App.css";

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cities" element={<CityManagement />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;