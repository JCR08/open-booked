import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var attractions = require('./attractions.json')
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
    axios.get('https://intense-harbor-66125.herokuapp.com')
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
    return (
      <ul className="row">
        {this.state.attractions.map(attraction => {
          return (
            <li className="card-panel image-container col s4 center-align">

              <Link to={`/attraction/${attraction.permalink}`}>
                <img className="responsive-img" src={`${attraction.image}`}/>
                <div><b>{attraction.name}</b></div>
                <div>Location: {attraction.world}</div>
                <div>{this.waitTime(attraction)}</div>
              </Link>

            </li>
          )
        })}
      </ul>
    )
  }

  waitTime(attraction){
    if(attraction.waitTime > 0){
      if(attraction.status === "Operating"){
        return (
           <div>Wait Time: <em>{attraction.waitTime} minutes</em></div>
        )
      } else {
        return (
          <div>Status: <em>{attraction.status}</em></div>
        )
      }
    }
  }

  displayLoader(){
    return(
      <div className="center-align loader">
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  render(){

    return(
      <div className="allAttractions container">

        <section>
          {this.state.attractions.length == 1 && this.displayLoader()}
          {this.state.attractions.length > 1 && this.displayState()}
        </section>

      </div>
    )
  }
}

export default Attractions;
