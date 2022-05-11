/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

export default function DiceSelectionBox({ selectionText, selectedDiceBreakdown }) {
  if (Object.entries(selectedDiceBreakdown).length > 0) {
    return (
      <>
        <div className="DiceSelectionBox-Selected">Selected Dice</div>
        <div className="DiceSelectionBox">{selectionText}</div>
      </>
    );
  }
  return (
    <>
      <div className="DiceSelectionBox-Selected">Selected Dice</div>
      <div className="DiceSelectionBox" />
    </>
  );
}

DiceSelectionBox.propTypes = {
  selectionText: PropTypes.string,
  selectedDiceBreakdown: PropTypes.string,
};
