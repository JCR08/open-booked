import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Testing extends Component {

  componentDidMount(){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/attractions.json`)
      .then(response => console.log(response.data))
    axios.get('https://intense-harbor-66125.herokuapp.com')
      .then(response => console.log(response.data))
  }

  render(){
    return(
      <h1>poop</h1>
    )
  }
}

export default Testing
