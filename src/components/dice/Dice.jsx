import React from "react";

//stateless functional component
const Dice = ({ diceNumber }) => {

  const diceImage = (nmbr) => {
    let url = "http://roll.diceapi.com/images/poorly-drawn/d6/";
    url += nmbr + ".png"
    return url
  }

  return (
    <React.Fragment>
      <img alt="dice" src={diceImage(diceNumber)}/>
    </React.Fragment>
  )
};

export default Dice;
