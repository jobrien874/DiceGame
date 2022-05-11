import React, { useEffect, useState } from 'react';
import DiceContainer from '../dice/DiceContainer';
import DiceResults from '../dice/DiceResults';
import MuteButton from '../audio/MuteButton';
import Buttons from '../buttons/Buttons';
import DiceSelectionBox from '../dice/DiceSelectionBox';

// statefull functional component
function GameV2() {
  const diceType = ['D6', 'D4', 'D8', 'D10', 'D12', 'D20', 'D100'];
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
  const [diceNumbers, setDiceNumbers] = useState([1]);
  const [logPastResultsBreakdown, setLogPastResultsBreakdown] = useState([]);
  const [logPastResults, setLogPastResults] = useState([]);
  const [selectionText, setSelectionText] = useState('');
  const [diceTypeSelected, setDiceTypeSelected] = useState(6);
  const [selectedDiceBreakdown, setSelectedDiceBreakdown] = useState({});
  const [diceModifier, setDiceModifier] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://c6.patreon.com/becomePatronButton.bundle.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const setDiceNumbersFunc = (diceCountArg, diceHistoryChange) => {
    let totalCount = 0;
    // eslint-disable-next-line radix
    let diceModifierInt = parseInt(diceModifier);
    const logPastResultsArr = logPastResults;
    const diceNumbersCurrent = [];
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(diceModifierInt)) {
      diceModifierInt = 0;
    }
    if (diceCountArg.constructor === Array) {
      for (let i = 0; i < diceCountArg.length; i += 1) {
        const counter = Math.floor(Math.random() * diceCountArg[i]) + 1;
        totalCount += counter;
        diceNumbersCurrent.push(counter);
      }
      totalCount += diceModifierInt;
      if (diceHistoryChange) {
        logPastResultsArr.push(totalCount);
      }
      setLogPastResults(logPastResultsArr);
      setDiceNumbers(diceNumbersCurrent);
      setTotal(totalCount);
    } else {
      for (let i = 0; i < diceCountArg; i += 1) {
        const counter = Math.floor(Math.random() * diceTypeSelected) + 1;
        totalCount += counter;
        diceNumbersCurrent.push(counter);
      }
      // eslint-disable-next-line no-unused-vars
      totalCount += diceModifierInt;
      if (diceHistoryChange) {
        logPastResultsArr.push(totalCount);
      }
      setLogPastResults(logPastResultsArr);
      setDiceNumbers(diceNumbersCurrent);
      setTotal(totalCount);
    }
  };

  const getDiceType = (e) => {
    let diceTypeChosen = e.target.value;
    switch (diceTypeChosen) {
      case 'D6':
        diceTypeChosen = 6;
        break;

      case 'D4':
        diceTypeChosen = 4;
        break;

      case 'D8':
        diceTypeChosen = 8;
        break;

      case 'D10':
        diceTypeChosen = 10;
        break;

      case 'D12':
        diceTypeChosen = 12;
        break;

      case 'D20':
        diceTypeChosen = 20;
        break;

      case 'D100':
        diceTypeChosen = 100;
        break;

      default:
        diceTypeChosen = 6;
        break;
    }
    setDiceTypeSelected(diceTypeChosen);
  };

  const startAudio = () => {
    if (!mute) {
      const audio = new Audio('/roll.mp3');
      audio.play();
    }
  };

  const makeModifierText = (modifier) => {
    if (Math.sign(modifier) === -1) {
      return ' ';
    }
    return '+';
  };

  const makeSelectionBoxString = (selectedDiceBreakdownArg) => {
    let selectionTextString = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(selectedDiceBreakdownArg)) {
      if (value > 0 && key !== '+') {
        selectionTextString += `${key}x${value} `;
      } else if (value < 0 || key === '+') {
        if (value !== 0) {
          selectionTextString += `${key}${value}`;
        }
      }
    }
    setSelectionText(selectionTextString);
  };

  const breakdownSelectedDice = (selDiceProp) => {
    // eslint-disable-next-line no-unneeded-ternary
    const selDice = selDiceProp ? selDiceProp : selectedDice;
    const modifierText = makeModifierText(diceModifier);
    const selectedDiceBreakdownObj = {
      D4: 0,
      D6: 0,
      D8: 0,
      D10: 0,
      D12: 0,
      D20: 0,
      D100: 0,
      // eslint-disable-next-line radix
      [modifierText]: parseInt(diceModifier),
    };

    selDice.forEach((dice) => {
      switch (dice) {
        case 6:
          selectedDiceBreakdownObj.D6 += 1;
          break;

        case 4:
          selectedDiceBreakdownObj.D4 += 1;
          break;

        case 8:
          selectedDiceBreakdownObj.D8 += 1;
          break;

        case 10:
          selectedDiceBreakdownObj.D10 += 1;
          break;

        case 12:
          selectedDiceBreakdownObj.D12 += 1;
          break;

        case 20:
          selectedDiceBreakdownObj.D20 += 1;
          break;

        case 100:
          selectedDiceBreakdownObj.D100 += 1;
          break;

        default:
          selectedDiceBreakdownObj.D6 += 1;
          break;
      }
    });

    setSelectedDiceBreakdown(selectedDiceBreakdownObj);
    const objectEntriesLength = Object.entries(selectedDiceBreakdownObj).length;
    if (objectEntriesLength > 0 || objectEntriesLength < 0) {
      makeSelectionBoxString(selectedDiceBreakdownObj);
    }
  };

  const addDice = () => {
    const selDice = [...selectedDice];
    const diceNumbersCurrent = [...diceNumbers];
    for (let i = 0; i < diceCount; i += 1) {
      selDice.push(diceTypeSelected);
      diceNumbersCurrent.push(1);
    }
    setSelectedDice(selDice);
    breakdownSelectedDice(selDice);
  };

  const refreshDice = () => {
    setSelectedDice([]);
    setSelectedDiceBreakdown({});
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

  const getDiceRoll = () => {
    startAudio();
    const results = logPastResultsBreakdown;
    if (selectedDice.length > 0) {
      breakdownSelectedDice();
      setDiceNumbersFunc(selectedDice, true);
      results.push(selectionText);
    } else {
      setDiceNumbersFunc(diceCount, true);
      results.push('Freeroll');
    }
    setLogPastResultsBreakdown(results);
  };

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
          <label htmlFor="diceCount">
            Dice Type:
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
          </label>
        </div>
        <div className="form-group mt-2 DiceFormInput">
          <label htmlFor="diceCount">
            Dice Count:
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
          </label>
        </div>
        <div className="form-group mt-2 DiceFormInput">
          <label htmlFor="diceModifier">
            Modifier:
            <input
              placeholder="0"
              type="number"
              onChange={(e) => setDiceModifier(e.target.value)}
              className="mt-2 form-control m-auto mo-0"
              id="diceModifier"
            />
          </label>
        </div>
      </div>
      <Buttons
        selectedDice={selectedDice}
        getDiceRoll={getDiceRoll}
        refreshDice={refreshDice}
        addDice={addDice}
      />
    </>
  );
}

export default GameV2;
