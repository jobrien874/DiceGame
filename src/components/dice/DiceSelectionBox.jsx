import React from "react";

const DiceSelectionBox = ({ selectedDiceBreakdown }) => {

  if(Object.entries(selectedDiceBreakdown).length > 0){
  let selection = selectedDiceBreakdown;
  let selectionText = "";
  for (const [key, value] of Object.entries(selection)) {
    if (value > 0) {
        selectionText += `${key}x${value} `
    }
  }
  return (<div className="DiceSelectionBox">{selectionText}</div>);
 } else {
     return (<div className="DiceSelectionBox"></div>);
 }
};

export default DiceSelectionBox;
