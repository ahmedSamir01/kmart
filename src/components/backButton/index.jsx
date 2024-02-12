import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ url }) => {
  const Navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn back-button btn-warning mb-3"
      onClick={() => Navigate(url || -1)}
    >
      back
    </button>
  );
};

export default BackButton;
