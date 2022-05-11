/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

// all data via props no helper methods and such so this should be a stateless
// functional component - function that returns a react element - need props as a parametter

// stateless functional component pass count of dice and number on dice
export default function DiceResults({
  // eslint-disable-next-line no-unused-vars
  logPastResults, saveGame, clearGame, logPastResultsBreakdown,
}) {
  const results = [];
  for (let i = 0; i < logPastResults.length; i += 1) {
    results.push(
      <tr key={i}>
        <th scope="row" className="">{i + 1}</th>
        <td className="ResultsContainer-item">{logPastResults[i]}</td>
        <td className="ResultsContainer-item">{logPastResultsBreakdown[i]}</td>
      </tr>,
    );
  }
  return (
    <div className="ResultsContainer">
      <div className="ResultsContainer-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Roll</th>
              <th scope="col">Total</th>
              <th scope="col">Dice Rolled</th>
            </tr>
          </thead>
          <tbody className="ResultsContainer-items">
            {results}
          </tbody>
        </table>
      </div>
      <div className="ResultsContainer-footer">
        {/* <button className="btn btn-secondary" onClick={saveGame}>Save Game</button> */}
        <button type="button" className="btn btn-secondary" onClick={clearGame}>Clear Game</button>
      </div>
    </div>
  );
}

DiceResults.propTypes = {
  logPastResults: PropTypes.string,
  saveGame: PropTypes.string,
  clearGame: PropTypes.string,
  logPastResultsBreakdown: PropTypes.string,
};
