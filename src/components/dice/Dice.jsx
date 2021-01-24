import React from "react";

//stateless functional component
const Dice = ({ diceNumber }) => {

  const diceImage = (nmbr) => {
    let url = "/";
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
