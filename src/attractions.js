import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Attractions extends Component {

  constructor(){
    super();
    this.state={
      attractions: [{}]
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get('http://localhost:8080')
      // .then(response => console.log(response.data))
      .then(response => response.data.sort(function(a,b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if(nameA < nameB){
          return -1
        } else if (nameA > nameB){
          return 1
        } else {
          return 0
        }
      }))
      .then(array => array.filter(object => object.name.includes('Halloween') !== true))
      .then(array => array.filter(object => object.name.includes('Christmas') !== true))
      .then(array => array.filter(object => object.name.includes('Pirate and Princess') !== true))
      .then(array => array.filter(object => object.name.includes('Pirates at Walt Disney World') !== true))
      .then(array => this.setState({ attractions: array }))
  }

  displayState(){
    console.log(this.state.attractions);
    return (
      <ul>
        {this.state.attractions.map(attraction => {
          return (
            <li className="card-panel image-container col s4 center-align">
              <img className="responsive-img" src={`${attraction.image}`}/>
              {attraction.name}
            </li>
          )
        })}
      </ul>
    )
  }

  render(){
    return(
      <div className="homePage container">

        <ul id="worldsDropdown" className="dropdown-content">
          <li><a href="#!" className="center-align">Main Street, USA</a></li>
          <li className="divider"></li>
          <li><a href="#!" className="center-align">Adventureland</a></li>
          <li className="divider"></li>
          <li><a href="#!" className="center-align">Frontierland</a></li>
          <li className="divider"></li>
          <li><a href="#!" className="center-align">Liberty Square</a></li>
          <li className="divider"></li>
          <li><a href="#!" className="center-align">Fantasyland</a></li>
          <li className="divider"></li>
          <li><a href="#!" className="center-align">Tomorrowland</a></li>
        </ul>

        <ul id="diningDropdown" className="dropdown-content">
          <li><a className="center-align" href="#!">Quick Service</a></li>
          <li className="divider"></li>
          <li><a className="center-align" href="#!">Table Service</a></li>
        </ul>

        <nav>
          <div className="nav-wrapper row #e3f2fd blue lighten-5">
            <ul className="hide-on-med-and-down">
              <li className="col s6 center-align">
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="worldsDropdown">
                  Worlds
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
              <li className="col s6 center-align">
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="diningDropdown">
                  Dining
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="attractions row">
          {this.displayState()}
        </div>

      </div>
    )
  }
}

export default Attractions;
