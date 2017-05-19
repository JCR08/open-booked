import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
  } from 'react-router-dom';
import logo from './logo.gif';
import Home from './home';
import Attractions from './attractions';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      user: {},
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header #90caf9 blue lighten-3">
            <Link to="/">
              <h1>Open Booked Disney</h1>
            </Link>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="login">
              login
            </div>
          </header>
          <div className="body">

            <Route exact path="/" render={(defaultProps) =>
              <Home {...defaultProps}/> }
            />

            <Route path="/attractions" render={(defaultProps) =>
              <Attractions {...defaultProps}/> }
            />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
