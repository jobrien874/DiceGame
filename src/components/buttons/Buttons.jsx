/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons({
  selectedDice, getDiceRoll, refreshDice, addDice,
}) {
  if (selectedDice.length === 0) {
    return (
      <div className="ButtonContainer">
        <button type="button" className="btn btn-secondary mt-4" onClick={addDice}>
          Add Dice
        </button>
        <button type="button" className="btn btn-secondary mt-4" onClick={getDiceRoll}>
          Click To Roll Dice
        </button>
      </div>
    );
  }
  return (
    <div className="ButtonContainer">
      <button type="button" className="btn btn-secondary mt-4" onClick={refreshDice}>
        Refresh Dice
      </button>
      <button type="button" className="btn btn-secondary mt-4" onClick={addDice}>
        Add Dice
      </button>
      <button type="button" className="btn btn-secondary mt-4" onClick={getDiceRoll}>
        Click To Roll Selected Dice
      </button>
    </div>
  );
}

Buttons.propTypes = {
  selectedDice: PropTypes.string,
  getDiceRoll: PropTypes.string,
  refreshDice: PropTypes.string,
  addDice: PropTypes.string,
};
