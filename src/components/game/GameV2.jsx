import React, { useEffect, useState } from "react";
import DiceContainer from "../dice/DiceContainer";
import DiceResults from "../dice/DiceResults";
import MuteButton from "../audio/MuteButton";
import Buttons from "../buttons/Buttons";
import DiceSelectionBox from "../dice/DiceSelectionBox";

//statefull functional component
const GameV2 = () => {

  const diceType = ["D6", "D4", "D8", "D10", "D12", "D20", "D100"];
  const maxDiceAmount = [
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
  ];

  const [total, setTotal] = useState(1);
  const [diceCount, setDiceCount] = useState(1);
  const [mute, setMute] = useState(false);
  const [selectedDice, setSelectedDice] = useState([]);
  const [diceNumbers, setDiceNumbers] = useState([1])
  const [logPastResultsBreakdown, setLogPastResultsBreakdown] = useState([]);
  const [logPastResults, setLogPastResults] = useState([]);
  const [selectionText, setSelectionText] = useState("");
  const [diceTypeSelected, setDiceTypeSelected] = useState(6);
  const [selectedDiceBreakdown, setSelectedDiceBreakdown] = useState({})
  const [diceModifier, setDiceModifier] = useState(0)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://c6.patreon.com/becomePatronButton.bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }, [])


  const setDiceNumbersFunc = (diceCount, diceHistoryChange) => {
    let diceModifierInt = parseInt(diceModifier);
    let diceNumbersCurrent = [...diceNumbers];
    let total = 0;
    let logPastResultsArr = [...logPastResults];
    if (isNaN(diceModifier)) {
      diceModifierInt = 0;
    }
    if (diceCount.constructor === Array) {
      for (let i = 0; i < diceCount.length; i++) {
        console.log(diceCount)
        let counter = Math.floor(Math.random() * diceCount[i]) + 1;
        total += counter;
        diceNumbersCurrent.push(counter);
      }
      total += diceModifierInt;
      if (diceHistoryChange) {
        logPastResultsArr.push(total);
      }
      setLogPastResults(logPastResultsArr);
      setDiceNumbers(diceNumbersCurrent);
      setTotal(total);
    } else {
      for (let i = 0; i < diceCount; i++) {
        let counter = Math.floor(Math.random() * diceType) + 1;
        total += counter;
        diceNumbersCurrent.push(counter);
      }
      total += diceModifierInt;
      if (diceHistoryChange) {
        logPastResultsArr.push(total);
      }
      setLogPastResults(logPastResultsArr);
      setDiceNumbers(diceNumbersCurrent);
      setTotal(total);
    }
  };


  const getDiceType = (e) => {
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
    setDiceTypeSelected(diceType);
  };


  const startAudio = () => {
    if (!mute) {
      const audio = new Audio("/roll.mp3");
      audio.play();
    }
  };

  const addDice = () => {
    let selDice = [...selectedDice];
    let diceNumbersCurrent = [...diceNumbers];
    for (let i = 0; i < diceCount; i++) {
      selDice.push(diceTypeSelected);
      diceNumbersCurrent.push(1);
    }
    console.log(selDice, 'selected');
    setSelectedDice(selDice);
    breakdownSelectedDice(selDice);
  };


  const refreshDice = () => {
    setSelectedDice([])
    setSelectedDiceBreakdown({})
  };

  const clearGame = () => {
    // delete memory and restore state
    window.location.reload();
  };


  const getDiceNumber = (e) => {
    setDiceCount(e.target.value);
    if (selectedDice.length === 0) {
      setDiceNumbersFunc(diceCount, false);
    }
  };

  const breakdownSelectedDice = (selDiceProp) => {
    let selDice = selDiceProp ? selDiceProp : selectedDice;
    let modifier = diceModifier;
    let modifierText = makeModifierText(modifier)
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

    selDice.forEach((dice) => {
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
    setSelectedDiceBreakdown(selectedDiceBreakdown)

    if (Object.entries(selectedDiceBreakdown).length > 0 || Object.entries(selectedDiceBreakdown).length < 0) {
      makeSelectionBoxString(selectedDiceBreakdown);
    }
  };

  const getDiceRoll = () => {
    startAudio();
    let results = [];
    if (selectedDice.length > 0) {
      breakdownSelectedDice();
      setDiceNumbersFunc(selectedDice, true);
      results.push(selectionText);
    } else {
      setDiceNumbersFunc(diceCount, true);
      results.push("Freeroll");
    }
    setLogPastResultsBreakdown(results);
  };

  const makeSelectionBoxString = (selectedDiceBreakdown) => {
    let selectionTextString = "";
    for (const [key, value] of Object.entries(selectedDiceBreakdown)) {
      if (value > 0 && key !== "+") {
        selectionTextString += `${key}x${value} `;
      } else if (value < 0 || key === "+") {
        if (value !== 0) {
          selectionTextString += `${key}${value}`;
        }
      }
    }
    setSelectionText(selectionTextString);
  };

  const makeModifierText = (modifier) => {
    if (Math.sign(modifier) === -1) {
      return " ";
    } else {
      return "+";
    }
  }

  return (
    <>
      <DiceResults
        logPastResults={logPastResults}
        logPastResultsBreakdown={logPastResultsBreakdown}
        clearGame={clearGame}
      />
      <DiceContainer
        total={total}
        diceCount={diceCount}
        selectedDice={selectedDice}
        diceNumber={diceNumbers}
      />
      <MuteButton mute={mute} setMute={setMute} />
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
            onChange={getDiceType}
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
            onChange={getDiceNumber}
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
            onChange={setDiceModifier}
            className="mt-2 form-control m-auto mo-0"
            id="diceModifier"
          />
        </div>
      </div>
      <Buttons
        selectedDice={selectedDice}
        getDiceRoll={getDiceRoll}
        refreshDice={refreshDice}
        addDice={addDice}
      />
    </>
  )

};

export default GameV2;
