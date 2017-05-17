import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.gif';
import Home from './home';
import './App.css';

class App extends Component {

  getData (){
    axios.get('https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/attractions.json')
    .then(response => console.log(response))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header #90caf9 blue lighten-3">
          <h1>Open Booked Disney</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="login">Login</div>
          <div>{this.getData()}</div>
        </header>
        <div className="body">
          <Home/>
        </div>
      </div>
    );
  }
}

export default App;
