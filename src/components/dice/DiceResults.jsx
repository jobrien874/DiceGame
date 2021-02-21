import React from "react";

// all data via props no helper methods and such so this should be a stateless functional component - function that returns a react element - need props as a parametter

//stateless functional component pass count of dice and number on dice
const DiceResults = ({logPastResults}) => {
  let results = []
  for (var i = 0; i < logPastResults.length; i++) {
      results.push(
      <tr key={i}>
      <th scope="row" className="">{i + 1}</th>
      <td className="ResultsContainer-item">{logPastResults[i]}</td>
      </tr>
      );
  }
  return (
    <div className="ResultsContainer">
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Roll</th>
        <th scope="col">Total</th>
      </tr>
      </thead>
      <tbody className="ResultsContainer-items">
        {results}
      </tbody>
    </table>
    </div>
  )
};

export default DiceResults;
