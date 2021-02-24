import React from "react";

const DiceSelectionBox = ({ selectionText, selectedDiceBreakdown }) => {
/*   const makeSelectionBoxString = () => {
    let selection = selectedDiceBreakdown;
    let selectionText = "";
    for (const [key, value] of Object.entries(selection)) {
      if (value > 0) {
        selectionText += `${key}x${value} `;
      }
    }
    return selectionText;
  } */

  if (Object.entries(selectedDiceBreakdown).length > 0) {
    return (
      <React.Fragment>
        <div className="DiceSelectionBox-Selected">Selected Dice</div>
        <div className="DiceSelectionBox">{selectionText}</div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="DiceSelectionBox-Selected">Selected Dice</div>
        <div className="DiceSelectionBox"></div>
      </React.Fragment>
    );
  }
};

export default DiceSelectionBox;
