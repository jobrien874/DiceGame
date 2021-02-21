import React from "react";

// all data via props no helper methods and such so this should be a stateless functional component - function that returns a react element - need props as a parametter

//stateless functional component pass count of dice and number on dice
const DiceResults = ({logPastResults}) => {
  let results = []
  for (var i = 0; i < logPastResults.length; i++) {
      results.push(<li className="ResultsContainer-item">{logPastResults[i]} Total Score</li>);
  }
  return (
    <div className="ResultsContainer container-fluid">
      <ol className="ResultsContainer-items">
        {results}
      </ol>
    </div>
  )
};

export default DiceResults;
