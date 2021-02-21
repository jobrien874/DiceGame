import React from "react";

//stateless functional component
const Dice = ({diceImage}) => {
  if(diceImage) {
  return (
    <React.Fragment>
      <img alt="dice" src={diceImage}/>
    </React.Fragment>
  )
  } else {
    return null;
  }
};

export default Dice;
