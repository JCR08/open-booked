import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');
var attractions = require('./attractions.json')

class Testing extends Component {

  componentDidMount(){
    Promise.all([
      axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/attractions.json`),
      axios.get('https://intense-harbor-66125.herokuapp.com')
    ])
    .then(array => {
      let arrayMerged = array[0].data.map(elm => {
        let attMatch = array[1].data.find(object => {
          return elm.permalink === object.permalink
        })
        if(attMatch){
          return {...attMatch, ...elm}
        } else {
          return elm
        }
      })
      let leftovers = array[1].data.filter(elm => {
        let attMatch = arrayMerged.find(object => {
          return elm.permalink === object.permalink
        })
        if(attMatch){
          return elm
        }
        console.log(leftovers);
      })
    })
  }

  render(){
    return(
      <h1>poop</h1>
    )
  }
}

export default Testing
