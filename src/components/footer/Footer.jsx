/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Footer() {
  return (
    <footer className="App-footer container-fluid  mt-auto">
      <p className="PatreonMessage">
        Help Keep Dice Roll Free From Ads and Contribute Towards my Patreon
      </p>
      <p className="text-center">
        By
        {' '}
        <a href="https://joshob.ie">Josh O'Brien - joshob.ie</a>
      </p>
    </footer>
  );
}
