/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';

// stateless functional component pass count of dice and number on dice
export default function DiceContainer({
  diceCount, diceNumber, total, selectedDice,
}) {
  const rows = [];
  let src = false;
  if (selectedDice.length > 0) {
    for (let i = 0; i < selectedDice.length; i += 1) {
      try {
        require(`../../../public/${diceNumber[i]}.png`);
        src = `/${diceNumber[i]}.png`;
      } catch (err) {
        src = false;
      }
      rows.push(<Dice key={i} total={total} diceNumber={diceNumber[i]} diceImage={src} />);
    }
  } else {
    for (let i = 0; i < diceCount; i += 1) {
      try {
        require(`../../../public/${diceNumber[i]}.png`);
        src = `/${diceNumber[i]}.png`;
      } catch (err) {
        src = false;
      }
      rows.push(<Dice key={i} total={total} diceNumber={diceNumber[i]} diceImage={src} />);
    }
  }
  return (
    <>
      <div className="ResultsInfo">Add different Dice with the Add Dice Button (e.g. D6, D10 X2) or just Freeroll any number of one Dice.</div>
      <div className="container-fluid DiceBoard">
        {rows}
      </div>
    </>
  );
}

DiceContainer.propTypes = {
  diceCount: PropTypes.string,
  diceNumber: PropTypes.number,
  total: PropTypes.number,
  selectedDice: PropTypes.string,
};
