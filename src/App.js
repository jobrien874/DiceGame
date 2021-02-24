import Game from "./components/game/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <strong>DiceRoll</strong>
            </a>
            <a className="whiteNavLink" href="https://trello.com/b/MwnwgDvI/dice-util-workboard">
              Roadmap
            </a>
          </div>
        </div>
      </header>
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
      <footer className="App-footer container-fluid  mt-auto">
        <p className="PatreonMessage">
          Help Keep Dice Roll Free From Ads and Contribute Towards my Patreon
        </p>
        <p className="text-center">
          By <a href="https://joshob.ie">Josh O'Brien - joshob.ie</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
