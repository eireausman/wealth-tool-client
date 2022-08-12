import React from "react";
import "./CardSpinner.css";

interface CardSpinner {
  cardTitle: string;
}

const CardSpinner: React.FC<CardSpinner> = ({ cardTitle }) => {
  return <p className="spinnerText">{cardTitle} - loading</p>;
};

export default CardSpinner;
