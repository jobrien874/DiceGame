import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <strong>DiceRoll</strong>
            </a>
            <div className="justify-content-between">
            <Link className="whiteNavLink" to="/about">
              About
            </Link>
            <a className="whiteNavLink" href="https://trello.com/b/MwnwgDvI/dice-util-workboard">
              Roadmap
            </a>
            </div>
          </div>
        </div>
      </header>
     );
}

export default Header;