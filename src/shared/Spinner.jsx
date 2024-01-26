import React from "react";

function Spinner({ size }) {
  return (
    <div className={`spinner-border spinner-border-${size}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
