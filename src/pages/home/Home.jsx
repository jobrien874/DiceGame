import React from 'react';
import Game from '../../components/game/GameV2';

function Home() {
  return (
    <div className="App-body">
      <Game />
      <div className="mt-4">
        <a
          href="https://www.patreon.com/bePatron?u=23475911"
          data-patreon-widget-type="become-patron-button"
        >
          Become a Patron!
        </a>
      </div>
    </div>
  );
}

export default Home;
