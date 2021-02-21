import React from "react";
import Dice from '../dice/Dice'
// all data via props no helper methods and such so this should be a stateless functional component - function that returns a react element - need props as a parametter

//stateless functional component pass count of dice and number on dice
const DiceContainer = ({ diceCount, diceNumber, total }) => {

  var rows = [];
  let src = false;
  for (var i = 0; i < diceCount; i++) {
    try{
      require(`../../../public/${diceNumber[i]}.png`)
      src = `/${diceNumber[i]}.png`
      }
      catch(err){
          src = false;
      }
      rows.push(<Dice key={i} total={total} diceNumber={diceNumber[i]} diceImage={src} />);
  }
  return (
    <div className="container-fluid">
      {rows}
    </div>
  )
};

export default DiceContainer;
