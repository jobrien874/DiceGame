import React from "react";

//stateless functional component
const CounterLabel = ({ label }) => {
  if (label) {
    return (
      <div className="container-fluid">
        <span className="badge badge-pill badge-secondary">
          Same Number Rolled As Last Time!
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default CounterLabel;
