import React from "react";
import Dice from '../dice/Dice'
// all data via props no helper methods and such so this should be a stateless functional component - function that returns a react element - need props as a parametter

//stateless functional component pass count of dice and number on dice
const DiceContainer = ({ diceCount, diceNumber }) => {

  var rows = [];
  for (var i = 0; i < diceCount; i++) {
      rows.push(<Dice key={i} diceNumber={diceNumber[i]} />);
  }
  return (
    <div className="container-fluid">
      {rows}
    </div>
  )
};

export default DiceContainer;
