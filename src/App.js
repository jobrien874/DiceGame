import Game from './components/game/Game'
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Game />
        <div className="mt-4">
        <a href="https://www.patreon.com/bePatron?u=23475911" data-patreon-widget-type="become-patron-button">Become a Patron!</a>
        </div>
      </header>
    </div>
  );
}

export default App;
