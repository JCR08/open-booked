import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
  } from 'react-router-dom';
import logo from './logo.gif';
import Home from './home';
import SpecificWorld from './world';
import Attractions from './attractions';
import SingleAttraction from './single-attraction';
import QuickService from './quick-service';
import TableService from './table-service';
import SingleRestaurant from './single-restaurant';
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

            <Route path="/world/:world?" render={(defaultProps) =>
              <SpecificWorld {...defaultProps}/> }
            />

            <Route exact path="/attractions" render={(defaultProps) =>
              <Attractions {...defaultProps}/> }
            />

            <Route path="/attraction/:id?" render={(defaultProps) =>
              <SingleAttraction {...defaultProps}/> }
            />

            <Route exact path="/dining/quick-service" render={(defaultProps) =>
              <QuickService {...defaultProps}/> }
            />

            <Route exact path="/dining/table-service" render={(defaultProps) =>
              <TableService {...defaultProps}/> }
            />

            <Route path="/dining/quick-service-restaurant/:permalink?" render={(defaultProps) =>
              <SingleRestaurant {...defaultProps}/> }
            />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
