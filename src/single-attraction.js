import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class SingleAttraction extends Component{

  constructor(){
    super();
    this.state={
      attraction: []
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get('http://localhost:8080')
    .then(response => response.data.filter(data => data.id.includes(`${this.props.match.params.id}`) == true))
    //.then(object => console.log(object))
    .then(object => this.setState({ attraction: object[0] }))
  }

  displayState(){
    const attraction = this.state.attraction
    console.log(attraction);
    // console.log(attraction.image);
    return(
      <div className="card row">
        <div className="attractionImage col s6 center-align">
          <img className="responsive-img" src={`${attraction.image}`} alt="#"/>
        </div>
        <div className="attractionInfo col s6 center-align">
          <h4><u>{attraction.name}</u></h4>
          <p>Location: {attraction.world}</p>
          <p>{this.fastpass(attraction)}</p>
          <p>{attraction.description}</p>
          <div>{this.waitTime(attraction)}</div>
        </div>
      </div>
    )
  }

  waitTime(attraction){
    // console.log(attraction.status);
    if(attraction.status === "Operating"){
      return (
         <p>Wait Time: <em>{attraction.waitTime} minutes</em></p>
      )
    } else {
      return (
        <p>Status: <em>{attraction.status}</em></p>
      )
    }
  }

  fastpass(attraction){
    console.log(attraction.fastPass);
    if(attraction.fastPass == true){
      return (
        <p>Fastpass is available for this attraction.</p>
      )
    } else {
      return (
        <p>Fastpass is not available for this attraction.</p>
      )
    }
  }

  render(){
    return(
      <div className="singleAtttraction container">

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
              <li className="col s4 center-align">
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="worldsDropdown">
                  Worlds
                </a>
              </li>

              <li className="col s4 center-align">
                <Link className="black-text" to="/attractions">
                  Attractions
                </Link>
              </li>

              <li className="col s4 center-align">
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="diningDropdown">
                  Dining
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <section>
          {this.displayState()}
        </section>

      </div>
    )
  }
}

export default SingleAttraction;
