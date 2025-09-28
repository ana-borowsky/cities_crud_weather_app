import React from "react";
import Author from "./Author";
import Title from "./Title";
import { Link } from "react-router-dom";
import "../Styles.css";

const Layout = ({ subtitle, children }) => {
  return (
    <div className="container">
      <Title>
        <Link to="/">Urban Weather</Link>
      </Title>

      <h3 className="subtitle"><strong>{subtitle}</strong></h3>

      {children}

      <Author />
    </div>
  );
};

export default Layout;
