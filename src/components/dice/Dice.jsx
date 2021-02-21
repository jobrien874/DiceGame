import React from "react";

//stateless functional component
const Dice = ({ diceImage, total }) => {
  if (diceImage) {
    return (
      <React.Fragment>
        <div className="DiceContainer diceImage">
          <img className="DiceImage" alt="dice" src={diceImage} />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="DiceContainer diceImageTotal">
          <span className="DiceContainer-total">{total}</span>
          <img className="DiceImage" alt="dice" src="./dice.png" />
        </div>
      </React.Fragment>
    );
  }
};

export default Dice;
