import React from "react";
import { Link } from "react-router-dom";
import "../Styles.css";

const Title = () => {
  return (
    <h1 className="retro-title">
      <Link to="/">Urban Weather</Link>
    </h1>
  );
};

export default Title;
