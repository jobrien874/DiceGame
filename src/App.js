/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
