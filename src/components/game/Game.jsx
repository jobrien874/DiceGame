import React, { Component } from "react";
import DiceContainer from "../dice/DiceContainer";
import DiceResults from "../dice/DiceResults";
import MuteButton from "../audio/MuteButton";
import Buttons from "../buttons/Buttons";
// import PropTypes from 'prop-types';
import DiceSelectionBox from "../dice/DiceSelectionBox";

// Class Component

class Game extends Component {
  state = {
    diceCount: 1,
    diceNumbers: [1],
    total: 1,
    diceModifier: 0,
    selectedDice: [],
    selectedDiceBreakdown: {},
    selectionText: "",
    logPastResults: [],
    logPastResultsBreakdown: [],
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
    let oldState = window.localStorage.getItem("oldState");
    if (oldState) {
      let olderState = JSON.parse(oldState);
      this.setState(olderState);
    }
  }

  startAudio = () => {
    let mute = this.state.mute;
    if (!mute) {
      let audio = new Audio("/roll.mp3");
      audio.play();
    }
  };

  diceBreakdownString = () => {};

  saveGame = () => {
    // save game
    window.localStorage.setItem("oldState", JSON.stringify(this.state));
  };

  clearGame = () => {
    // delete memory and restore state
    localStorage.clear();
    window.location.reload();
  };

  setMute = () => {
    let mute = !this.state.mute;
    this.setState({ mute });
  };

  setDiceNumbers = (diceCount, diceHistoryChange) => {
    let diceModifier = parseInt(this.state.diceModifier);
    if (isNaN(diceModifier)) {
      diceModifier = 0;
    }
    if (diceCount.constructor === Array) {
      let diceNumbers = [];
      let total = 0;
      let logPastResults = this.state.logPastResults;
      for (let i = 0; i < diceCount.length; i++) {
        let counter = Math.floor(Math.random() * diceCount[i]) + 1;
        total += counter;
        diceNumbers.push(counter);
      }
      total += diceModifier;
      if (diceHistoryChange) {
        logPastResults.push(total);
      }
      this.setState({ diceNumbers, total, logPastResults });
    } else {
      let diceNumbers = [];
      let total = 0;
      let logPastResults = this.state.logPastResults;
      let diceType = this.state.diceTypeSelected;
      let diceModifier = parseInt(this.state.diceModifier);
      for (let i = 0; i < diceCount; i++) {
        let counter = Math.floor(Math.random() * diceType) + 1;
        total += counter;
        diceNumbers.push(counter);
      }
      total += diceModifier;
      if (diceHistoryChange) {
        logPastResults.push(total);
      }
      this.setState({ diceNumbers, total, logPastResults });
    }
  };

  setDiceModifier = (e) => {
    let diceModifier = e.target.value;
    this.setState({ diceModifier });
  };

  getDiceRoll = () => {
    this.startAudio();
    let selectedDice = this.state.selectedDice;
    let logPastResultsBreakdown = this.state.logPastResultsBreakdown;
    if (selectedDice.length > 0) {
      this.breakdownSelectedDice();
      this.setDiceNumbers(this.state.selectedDice, true);
      logPastResultsBreakdown.push(this.state.selectionText);
      console.log(logPastResultsBreakdown);
    } else {
      this.setDiceNumbers(this.state.diceCount, true);
      logPastResultsBreakdown.push("Freeroll");
    }
    this.setState({ logPastResultsBreakdown });
  };

  makeSelectionBoxString = (selectedDiceBreakdown) => {
    let selection = selectedDiceBreakdown;
    let selectionText = "";
    for (const [key, value] of Object.entries(selection)) {
      if (value > 0 && key !== "+") {
        selectionText += `${key}x${value} `;
      } else if (value < 0 || key === "+") {
        if(value !== 0) {
        selectionText += `${key}${value}`;
        }
      }
    }
    this.setState({ selectionText });
  };

  makeModifierText = (modifier) => {
    if(Math.sign(modifier) === -1){
      return " ";
    } else {
      return "+";
    }
  }

  breakdownSelectedDice = () => {
    let selectedDice = this.state.selectedDice;
    let modifier = this.state.diceModifier;
    let modifierText = this.makeModifierText(modifier)
    let selectedDiceBreakdown = {
      D4: 0,
      D6: 0,
      D8: 0,
      D10: 0,
      D12: 0,
      D20: 0,
      D100: 0,
      [modifierText]: parseInt(modifier),
    };

    console.log(modifierText, modifier)
    console.log(selectedDiceBreakdown)
    selectedDice.forEach((dice) => {
      switch (dice) {
        case 6:
          selectedDiceBreakdown.D6 += 1;
          break;

        case 4:
          selectedDiceBreakdown.D4 += 1;
          break;

        case 8:
          selectedDiceBreakdown.D8 += 1;
          break;

        case 10:
          selectedDiceBreakdown.D10 += 1;
          break;

        case 12:
          selectedDiceBreakdown.D12 += 1;
          break;

        case 20:
          selectedDiceBreakdown.D20 += 1;
          break;

        case 100:
          selectedDiceBreakdown.D100 += 1;
          break;

        default:
          selectedDiceBreakdown.D6 += 1;
          break;
      }
    });
    this.setState({ selectedDiceBreakdown });

    if (Object.entries(selectedDiceBreakdown).length > 0 || Object.entries(selectedDiceBreakdown).length < 0) {
      this.makeSelectionBoxString(selectedDiceBreakdown);
    }
  };

  getDiceNumber = (e) => {
    let diceCount = e.target.value;
    let selectedDice = this.state.selectedDice;
    this.setState({ diceCount });
    if (selectedDice.length === 0) {
      this.setDiceNumbers(diceCount, false);
    }
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

  addDice = () => {
    let selectedDice = this.state.selectedDice;
    let diceNumbers = this.state.diceNumbers;
    let diceCount = this.state.diceCount;
    let diceType = this.state.diceTypeSelected;

    for (let i = 0; i < diceCount; i++) {
      selectedDice.push(diceType);
      diceNumbers.push(1);
    }
    this.setState({ selectedDice });
    this.breakdownSelectedDice();
  };

  refreshDice = () => {
    let selectedDice = [];
    let selectedDiceBreakdown = {};
    this.setState({ selectedDice, selectedDiceBreakdown });
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
      logPastResultsBreakdown,
      selectedDice,
      selectedDiceBreakdown,
      selectionText,
    } = this.state;

    return (
      <React.Fragment>
        <DiceResults
          logPastResults={logPastResults}
          logPastResultsBreakdown={logPastResultsBreakdown}
          saveGame={this.saveGame}
          clearGame={this.clearGame}
        />
        <DiceContainer
          total={total}
          diceCount={diceCount}
          selectedDice={selectedDice}
          diceNumber={diceNumbers}
        />
        <MuteButton mute={mute} setMute={this.setMute} />
        <DiceSelectionBox
          selectionText={selectionText}
          selectedDiceBreakdown={selectedDiceBreakdown}
        />
        <div className="container-fluid w-25  DiceForm">
          <div className="form-group mt-2 DiceFormInput">
            <label htmlFor="diceCount">Dice Type:</label>
            <select
              className="mt-2 form-control m-auto mb-0"
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
              className="mt-2 form-control m-auto mb-0"
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
              className="mt-2 form-control m-auto mo-0"
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
        <Buttons
          selectedDice={selectedDice}
          getDiceRoll={this.getDiceRoll}
          refreshDice={this.refreshDice}
          addDice={this.addDice}
        />
      </React.Fragment>
    );
  }
}

export default Game;
