import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
  } from 'react-router-dom';
import logo from './logo.gif';
import base from './rebase';
import NavBar from './navBar';
import Home from './home';
import MagicKingdom from './magic-kingdom';
import Dining from './dining';
import SpecificWorld from './world';
import Hotels from './hotels';
import SingleHotel from './single-hotel';
import Attractions from './attractions';
import SingleAttraction from './single-attraction';
import QuickService from './quick-service';
import TableService from './table-service';
import SingleRestaurant from './single-restaurant';
import Testing from './testing'
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      user: {},
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
      } else {
        this.setState({
          user: {}
        })
      }
    })
  }


  loginOrLogoutButton(){
    if (this.state.user.uid) {
      return (
        <div className="center-align">
          <img src={`${this.state.user.photoURL}`} alt="" className="userAvatar circle"/>
          <div>Welcome, {this.state.user.displayName}</div>
          <div onClick={this.logout.bind(this)} className="waves-effect waves-light btn #bbdefb blue lighten-4">Logout</div>
        </div>
      )
    } else {
      return <button onClick={this.login.bind(this)}>Login</button>
    }
  }

  login (){
    var authHandler = (error, data) => {
      this.setState({
        user: data.user
      })
    }
    base.authWithOAuthPopup('google', authHandler)
  }

  logout(){
    base.unauth()
    this.setState({
      user: {}
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header #90caf9 blue lighten-3">
            <Link to="/">
              <h1>Open Booked Disney</h1>
            </Link>
            <div className="login">
              {this.loginOrLogoutButton()}
            </div>
          </header>

          <div className="navBar">
            <NavBar/>
          </div>
          <div className="body">

            <Route exact path="/" render={(defaultProps) =>
              <Home {...defaultProps}/> }
            />

            <Route exact path="/magic-kingdom" render={(defaultProps) =>
              <MagicKingdom {...defaultProps}/> }
            />

            <Route exact path="/dining" render={(defaultProps) =>
              <Dining {...defaultProps}/> }
            />

            <Route path="/world/:World?" render={(defaultProps) =>
              <SpecificWorld {...defaultProps}/> }
            />

            <Route exact path="/attractions" render={(defaultProps) =>
              <Attractions {...defaultProps}/> }
            />

            <Route exact path="/hotels" render={(defaultProps) =>
              <Hotels {...defaultProps}/> }
            />

            <Route path="/hotel/:specifichotel?" render={(defaultProps) =>
              <SingleHotel {...defaultProps}/> }
            />

            <Route path="/attraction/:permalink?" render={(defaultProps) =>
              <SingleAttraction {...defaultProps}/> }
            />

            <Route exact path="/dining/quick-service" render={(defaultProps) =>
              <QuickService {...defaultProps}/> }
            />

            <Route exact path="/dining/table-service" render={(defaultProps) =>
              <TableService {...defaultProps}/> }
            />

            <Route path="/:locationLink?/:diningLink?/restaurant/:permalink?" render={(defaultProps) =>
              <SingleRestaurant {...defaultProps}/> }
            />

            <Route path="/testing" render={(defaultProps) =>
              <Testing {...defaultProps}/> }
            />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
