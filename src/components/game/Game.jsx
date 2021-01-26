import React, { Component } from "react";
import DiceContainer from "../dice/DiceContainer";
// import PropTypes from 'prop-types';

// Class Component

class Game extends Component {
  state = {
    diceCount: 1,
    diceNumbers: [1],
    total: 1,
    maxDiceAmount: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      50,
      100,
    ],
    diceStyle: ["Regular", "Chaos", "Wood"],
    diceType: ["D6", "D4"],
    sameNumber: false,
    diceTypeSelected: 6
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://c6.patreon.com/becomePatronButton.bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }

  start = () => {
    let audio = new Audio("/roll.mp3");
    audio.play();
  };

  setDiceNumbers = (diceCount) => {
    let diceNumbers = [];
    let total = 0;
    let diceType = this.state.diceTypeSelected;
    for (let i = 0; i < diceCount; i++) {

      let counter = Math.floor(Math.random() * diceType) + 1;
      total += counter;
      diceNumbers.push(counter);
    }

    this.setState({ diceNumbers, total });
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

  getDiceStyle = (e) => {
    // TODO
  };

  getDiceType = (e) => {
    let diceType = e.target.value;
    switch (diceType) {
      case "D6":
        diceType = 6;
        break;

      case "D4":
        diceType = 4;
        break;

      default:
        diceType = 6;
        break;
    }
    this.setState({ diceTypeSelected:diceType });
  };

  render() {
    const {
      diceCount,
      diceNumbers,
      maxDiceAmount,
      diceStyle,
      total,
      diceType
    } = this.state;

    return (
      <React.Fragment>
        <h1>{total}</h1>
        <DiceContainer diceCount={diceCount} diceNumber={diceNumbers} />
        <div className="container-fluid w-25">
          <div className="form-group mt-2">
          <div className="form-group mt-2">
            <label for="diceCount">Dice Type:</label>
            <select
              className="mt-4 form-control m-auto mb-0"
              id="diceStyle"
              onChange={this.getDiceType}
            >
              {diceType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
            <label htmlFor="diceCount">Dice Count:</label>
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
          {/*           <div className="form-group mt-2">
            <label for="diceCount">Dice Style:</label>
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
          </div> */}
        </div>
        <button className="btn btn-secondary mt-4" onClick={this.getDiceRoll}>
          Click To Get Dice Roll
        </button>
      </React.Fragment>
    );
  }
}

export default Game;
