import React from "react";

const Buttons = ({ selectedDice, getDiceRoll, refreshDice, addDice }) => {
  if (selectedDice.length === 0) {
    return (
      <div className="ButtonContainer">
        <button className="btn btn-secondary mt-4" onClick={addDice}>
          Add Dice
        </button>
        <button className="btn btn-secondary mt-4" onClick={getDiceRoll}>
          Click To Roll Dice
        </button>
      </div>
    );
  } else {
    return (
      <div className="ButtonContainer">
        <button className="btn btn-secondary mt-4" onClick={refreshDice}>
          Refresh Dice
        </button>
        <button className="btn btn-secondary mt-4" onClick={addDice}>
          Add Dice
        </button>
        <button className="btn btn-secondary mt-4" onClick={getDiceRoll}>
          Click To Roll Selected Dice
        </button>
      </div>
    );
  }
};

export default Buttons;
