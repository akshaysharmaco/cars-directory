import React, { Component } from 'react';
import logo from './logo.svg';
import Carlist from './components/Carlist';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Carshop</h2>
         
        </header>
        <Carlist/>
      </div>
    );
  }
}

export default App;
