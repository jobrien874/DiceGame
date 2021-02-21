import React, { Component } from "react";
import DiceContainer from "../dice/DiceContainer";
import DiceResults from "../dice/DiceResults";
import MuteButton from "../audio/MuteButton";
// import PropTypes from 'prop-types';

// Class Component

class Game extends Component {
  state = {
    diceCount: 1,
    diceNumbers: [1],
    total: 1,
    diceModifier: 0,
    logPastResults: [],
    mute: false,
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
    diceType: ["D6", "D4", "D8", "D10", "D12", "D20", "D100"],
    sameNumber: false,
    diceTypeSelected: 6,
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://c6.patreon.com/becomePatronButton.bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }

  startAudio = () => {
    let mute = this.state.mute;
    if (!mute) {
      let audio = new Audio("/roll.mp3");
      audio.play();
    }
  };

  setMute = () => {
    let mute = !this.state.mute;
    this.setState({ mute });
  };

  setDiceNumbers = (diceCount) => {
    let diceNumbers = [];
    let total = 0;
    let logPastResults = this.state.logPastResults
    let diceType = this.state.diceTypeSelected;
    let diceModifier = parseInt(this.state.diceModifier);
    for (let i = 0; i < diceCount; i++) {
      let counter = Math.floor(Math.random() * diceType) + 1 + diceModifier;
      total += counter;
      diceNumbers.push(counter);
    }

    logPastResults.push(total)
    this.setState({ diceNumbers, total, logPastResults });
  };

  setDiceModifier = (e) => {
    let diceModifier = e.target.value;
    this.setState({ diceModifier });
  };

  getDiceRoll = () => {
    this.startAudio();
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

      case "D8":
        diceType = 8;
        break;

      case "D10":
        diceType = 10;
        break;

      case "D12":
        diceType = 12;
        break;

      case "D20":
        diceType = 20;
        break;

      case "D100":
        diceType = 100;
        break;

      default:
        diceType = 6;
        break;
    }
    this.setState({ diceTypeSelected: diceType });
  };

  render() {
    const {
      diceCount,
      diceNumbers,
      maxDiceAmount,
      mute,
      logPastResults,
      total,
      diceType,
    } = this.state;

    return (
      <React.Fragment>
        <DiceResults logPastResults={logPastResults}/>
        <DiceContainer total={total} diceCount={diceCount} diceNumber={diceNumbers} />
        <MuteButton mute={mute} setMute={this.setMute} />
        <div className="container-fluid w-25  DiceForm">
            <div className="form-group mt-2 DiceFormInput">
              <label htmlFor="diceCount">Dice Type:</label>
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
            <div className="form-group mt-2 DiceFormInput">
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
            <div className="form-group mt-2 DiceFormInput">
            <label htmlFor="diceModifier">Modifier:</label>
            <input
              placeholder="0"
              type="number"
              onChange={this.setDiceModifier}
              className="mt-4 form-control m-auto mo-0"
              id="diceModifier"
            />
            </div>
          {/*           <div className="form-group mt-2">
            <label htmlFor="diceCount">Dice Style:</label>
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
