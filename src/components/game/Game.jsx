import React, { Component } from "react";
import DiceContainer from "../dice/DiceContainer";
// import PropTypes from 'prop-types';

// Class Component

class Game extends Component {
  state = {
    diceCount: 1,
    diceNumbers: [1],
    maxDiceAmount: [1, 2, 3, 4, 5, 6],
    diceStyle: ["Regular", "Chaos", "Wood"],
    sameNumber: false,
  };

  start = () => {
    let audio = new Audio("/roll.mp3");
    audio.play();
  };

  setDiceNumbers = (diceCount) => {
    let diceNumbers = [];
    for (let i = 0; i < diceCount; i++) {
      let counter = Math.floor(Math.random() * 6) + 1;
      diceNumbers.push(counter);
    }

    this.setState({ diceNumbers });
  };

  getDiceRoll = () => {
    this.start();
    this.setDiceNumbers(this.state.diceCount);
  };

  getDiceNumber = (e) => {
    let diceCount = e.target.value;
    this.setState({ diceCount });
    this.setDiceNumbers(diceCount);
  };

  getDiceStyle = (e) => {};

  render() {
    const { diceCount, diceNumbers, maxDiceAmount, diceStyle } = this.state;

    return (
      <React.Fragment>
        <DiceContainer diceCount={diceCount} diceNumber={diceNumbers} />
        <div className="container-fluid w-25">
          <div className="form-group mt-2">
            <label for="diceCount">Dice Count:</label>
            <select
              className="mt-4 form-control m-auto mb-0"
              id="diceCount"
              onChange={this.getDiceNumber}
            >
              {maxDiceAmount.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label for="diceCount">Dice Type:</label>
            <select
              className="mt-4 form-control m-auto mb-0"
              id="diceStyle"
              onChange={this.getDiceStyle}
            >
              {diceStyle.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-secondary mt-4" onClick={this.getDiceRoll}>
          Click To Get Dice Roll
        </button>
      </React.Fragment>
    );
  }
}

export default Game;
