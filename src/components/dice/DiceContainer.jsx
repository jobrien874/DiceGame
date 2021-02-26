import React from "react";
import Dice from '../dice/Dice'
// all data via props no helper methods and such so this should be a stateless functional component - function that returns a react element - need props as a parametter

//stateless functional component pass count of dice and number on dice
const DiceContainer = ({ diceCount, diceNumber, total, selectedDice }) => {

  var rows = [];
  let src = false;
  if(selectedDice.length > 0) {
    for (let i = 0; i < selectedDice.length; i++) {
      try{
        require(`../../../public/${diceNumber[i]}.png`)
        src = `/${diceNumber[i]}.png`
        }
        catch(err){
            src = false;
        }
        rows.push(<Dice key={i} total={total} diceNumber={diceNumber[i]} diceImage={src} />);
    }
  } else {
  for (let i = 0; i < diceCount; i++) {
    try{
      require(`../../../public/${diceNumber[i]}.png`)
      src = `/${diceNumber[i]}.png`
      }
      catch(err){
          src = false;
      }
      rows.push(<Dice key={i} total={total} diceNumber={diceNumber[i]} diceImage={src} />);
  }
}
  return (
    <React.Fragment>
      <div className="ResultsInfo">Add different Dice with the Add Dice Button (e.g. D6, D10 X2) or just Freeroll any number of one Dice.</div>
      <div className="container-fluid DiceBoard">
        {rows}
      </div>
    </React.Fragment>
  )
};

export default DiceContainer;
