/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

// stateless functional component
export default function Dice({ diceImage, diceNumber }) {
  if (diceImage) {
    return (
      <div className="DiceContainer diceImage">
        <img className="DiceImage" alt="dice" src={diceImage} />
      </div>
    );
  }
  return (
    <div className="DiceContainer diceImageTotal">
      <span className="DiceContainer-total">{diceNumber}</span>
      <img className="DiceImage" alt="dice" src="./dice.png" />
    </div>
  );
}

Dice.propTypes = {
  diceImage: PropTypes.string,
  diceNumber: PropTypes.number,
};
