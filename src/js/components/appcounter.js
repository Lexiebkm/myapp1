import React from 'react';
//import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function AppCounter() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <Counter />
        <span></span>
      </header>
    </div>
  );
}

export default AppCounter;
