import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import base from './rebase';
var $ = window.jQuery = require('jquery');
var restaurants = require('./restaurants.json')

class SpecificWorld extends Component {

  constructor(){
    super();
    this.state={
      user: {},
      comments: [],
      attractions: [{}],
      quickService: [],
      tableService: []
    }
  }

  componentDidMount(){
    let world = this.props.match.params.World.split('-').join(' ')
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    this.getAttractions(world);
    this.getQuickService(world);
    this.getTableService(world);
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/world/${this.props.match.params.World}/comments`, {
          context: this,
          state: "comments",
          asArray: true
        })
      } else {
        this.setState({
          user: {},
          comments: []
        })
      }
    })
  }

  componentWillReceiveProps(newProps){
    let world = newProps.match.params.World.split('-').join(' ')
    $(".dropdown-button").dropdown( { hover: true } );
    this.getAttractions(world);
    this.getQuickService(world);
    this.getTableService(world);
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/world/${newProps.match.params.World}/comments`, {
          context: this,
          state: "comments",
          asArray: true
        })
      } else {
        this.setState({
          user: {},
          comments: []
        })
      }
    })
  }

  getAttractions(world){
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
      .then(array => array.filter(object => object.world == world.charAt(0).toUpperCase() + world.slice(1)))
      .then(array => this.setState({ attractions: array }))
  }

  getQuickService(world){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining.json`)
      .then(response => response.data[0].map(function(restaurant){
        var restaurantMatch = restaurants.find(function(elm){
          return elm["place"] === restaurant["name"];
        });
        if(restaurantMatch){
          restaurant["description"] = restaurantMatch["description"]
          restaurant["diningLink"] = restaurantMatch["diningLink"]
          restaurant["image"] = restaurantMatch["image"]
          restaurant["locationLink"] = restaurantMatch["locationLink"]
          restaurant["menus"] = restaurantMatch["menus"]
          restaurant["price"] = restaurantMatch["price"]
          restaurant["type"] = restaurantMatch["type"]
          restaurant["world"] = restaurantMatch["world"]
        }
        return restaurant
      }))
      .then(array => array.filter(object => object.world == world.charAt(0).toUpperCase() + world.slice(1)))
      .then(response => this.setState({ quickService: response }))
  }

  getTableService(world){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining.json`)
      .then(response => response.data[1].map(function(restaurant){
        var restaurantMatch = restaurants.find(function(elm){
          return elm["place"] === restaurant["name"];
        });
        if(restaurantMatch){
          restaurant["description"] = restaurantMatch["description"]
          restaurant["diningLink"] = restaurantMatch["diningLink"]
          restaurant["image"] = restaurantMatch["image"]
          restaurant["locationLink"] = restaurantMatch["locationLink"]
          restaurant["menus"] = restaurantMatch["menus"]
          restaurant["price"] = restaurantMatch["price"]
          restaurant["type"] = restaurantMatch["type"]
          restaurant["world"] = restaurantMatch["world"]
        }
        return restaurant
      }))
      .then(array => array.filter(object => object.world == world.charAt(0).toUpperCase() + world.slice(1)))
      .then(response => this.setState({ tableService: response }))
  }

  displayQuickService(){
    return (
      <ul className="row col s6">
        <h5 className="center-align">Quick Service Restaurants</h5>
        {this.state.quickService.map(restaurant => {
          return (
            <li className="card-panel image-container col s8 offset-s2 center-align">

              <Link to={`/${restaurant.locationLink}/${restaurant.diningLink}/restaurant/${restaurant.permalink}`}>
                <img className="responsive-img" src={`${restaurant.image}`}/>
                <div><b>{restaurant.name}</b></div>
                <div><em>Price Range: {restaurant.price}</em></div>
              </Link>

            </li>
          )
        })}
      </ul>
    )
  }

  displayTableService(){
    return (
      <ul className="row col s6">
        <h5 className="center-align">Table Service Restaurants</h5>
        {this.state.tableService.map(restaurant => {
          return (
            <li className="card-panel image-container col s8 offset-s2 center-align">

              <Link to={`/${restaurant.locationLink}/${restaurant.diningLink}/restaurant/${restaurant.permalink}`}>
                <img className="responsive-img" src={`${restaurant.image}`}/>
                <div><b>{restaurant.name}</b></div>
                <div><em>Price Range: {restaurant.price}</em></div>
              </Link>

            </li>
          )
        })}
      </ul>
    )
  }

  displayAttractions(){
    return (
      <ul className="row">
        <h5 className="center-align">Attractions</h5>
        {this.state.attractions.map(attraction => {
          return (
            <li className="card-panel image-container col s4 center-align">

              <Link to={`/attraction/${attraction.permalink}`}>
                <img className="responsive-img" src={`${attraction.image}`}/>
                <div><b>{attraction.name}</b></div>
                <div>{this.waitTime(attraction)}</div>
              </Link>

            </li>
          )
        })}
      </ul>
    )
  }

  waitTime(attraction){
    if(attraction.type === "ride"){
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

  submitComment(event){
    event.preventDefault();
    console.log(this.state.user);
    const comment = this.comment.value;
    const userName = this.state.user.displayName
    const userID = this.state.user.uid
    const userAvatar = this.state.user.photoURL
    const commentID = this.state.comments.length
    let newComment = this.setState({comments: [...this.state.comments, {
        comment,
        userName,
        userAvatar,
        userID,
        commentID
      }]})

    this.comment.value = '';
  }

  deleteButton(comment){
    if(this.state.user.uid === comment.userID){
      return <button className="destroy btn waves-effect waves-light" onClick={this.deleteComment.bind(this, comment)}>X</button>
    }
  }

  deleteComment(comment){
    let leftovers = this.state.comments.filter(object => {
      return comment.commentID !== object.commentID
    })
    this.setState({comments: leftovers})
  }

  displayComment(){
    if(this.state.user.uid){
      return(
        <div className="card row">
          <div className="commentDisplay col s12 center-align">
            <div>
              {this.state.comments.map(comment => {
                return (
                  <div className="commentCard row center-align valign-wrapper">
                    <div className="row col s4">
                      <img src={`${comment.userAvatar}`} alt="" className="commentAvatar col s3 offset-s4 circle"/>
                      <div className="col s12 center-align">{comment.userName}</div>
                    </div>
                    <div className="pastComments col s6 offest-s1">{comment.comment}</div>
                    <div>{this.deleteButton(comment)}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="leaveComment row col s12 center-align">
            <form className="row"
              onSubmit={this.submitComment.bind(this)}>
              <input
                className="col s8 offset-s1"
                placeholder='Leave a Comment'
                required
                ref={element => this.comment = element}
              />
              <button className="submitButton btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>

        </div>
      )
    } else {
      return(
        <div className="row">
          <div className="col s12 center-align">
            <div onClick={this.login.bind(this)} className="logButton waves-effect waves-light btn">Login to view or leave comments</div>
          </div>
        </div>
      )
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
      <div className="specificWorld container">
        <h4 className="center-align">{this.props.match.params.World.split('-').join(' ')}</h4>
        <section>
          {this.state.attractions.length == 1 && this.displayLoader()}
          {this.state.attractions.length > 1 && this.displayAttractions()}
          <div className="row">
            {this.state.quickService.length > 0 && this.displayQuickService()}
            {this.state.tableService.length > 0 && this.displayTableService()}
          </div>
        </section>

        <section>
          {this.displayComment()}
        </section>

      </div>
    )
  }

}

export default SpecificWorld;
