import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Testing extends Component {

  componentDidMount(){
    Promise.all([
      axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/attractions.json`),
      axios.get('https://intense-harbor-66125.herokuapp.com')
    ])
      .then(response => response[0].data.concat(response[1].data))
      .then(response => response.sort(function(a,b){
        // var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        var nameA=a.permalink, nameB=b.permalink;
        if(nameA < nameB){
          return -1
        } else if (nameA > nameB){
          return 1
        } else {
          return 0
        }
      }))
      // .then(arr => console.log(arr))
      .then(array => {
        let arrayMerged = array.map(elm => {
          let attMatch = array.find(object => {
            console.log(elm.permalink, object.permalink);
            return elm.permalink === object.permalink
          })
          let attraction = elm;
          for(var key in attMatch){
            if(attMatch.hasOwnProperty(key)){
              attraction[key] = attMatch[key]
            }
          }
          array.splice(attMatch, 1)
          return attraction
        })
        console.log(arrayMerged)
        // for(let i = 0; i < array.length; i++){
        //   for(let j = i++; j < array.length;){
        //     if (array[i].permalink === array[j].permalink){
        //       for( var key in array[j]){
        //         if (array[j].hasOwnProperty(key)){
        //           array[i][key] = array[j][key];
        //         }
        //       }
        //       array.splice(j, 1);
        //       return array
        //     } else {
        //       j++
        //     }
        //   }
        // }
      })
  }

  render(){
    return(
      <h1>poop</h1>
    )
  }
}

export default Testing
