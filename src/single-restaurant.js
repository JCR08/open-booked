import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import base from './rebase';
var $ = window.jQuery = require('jquery');
var restaurants = require('./restaurants.json')

class SingleRestaurant extends Component{

  constructor(){
    super();
    this.state={
      user: {},
      comments: [],
      restaurant: {},
      menu: [],
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/${this.props.match.params.locationLink}/${this.props.match.params.diningLink}/${this.props.match.params.permalink}.json`)
    .then(function(response){
      var restaurantMatch = restaurants.find(function(elm){
        return elm["place"] === response.data["name"];
      });
      let restaurant = response.data
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
    })
    .then(response => this.setState({restaurant: response}))
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/restaurant/${this.props.match.params.permalink}/comments`, {
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

  reservations(rest){
    if(rest.accepts_reservations){
      return(
        <p>Accepts Reservations</p>
      )
    }
  }

  displayState(){
    const rest = this.state.restaurant;
    return(
      <div className="card row">
        <div className="restaurantImage col s6 center-align">
          <img className="responsive-img" src={`${rest.image}`} alt="#"/>
        </div>
        <div className="restaurantInfo col s6 center-align">
          <h4><u>{rest.name}</u></h4>
          <p>Location: {rest.world}</p>
          <p>{this.reservations(rest)}</p>
          <p>Food Type: {rest.cuisine}</p>
          <p>Price Range: {rest.price}</p>
          <p>{rest.description}</p>
        </div>
      </div>
    )
  }

  displayMenuButtons(){
    const rest = this.state.restaurant;
    return(
      <ul className="menuButtonDisplay card row col s4 center-align">
        <h5><u>Choose Menu</u></h5>
        {rest.menus.map(menu => {
          if(menu.url){
            return(
              <li className="col s6 center-align">
                <div onClick={this.setMenuState.bind(this, menu)} className="menuButton waves-effect waves-light btn">{menu.meal}</div>
              </li>
          )}
        }
      )}
      </ul>
    )
  }

  setMenuState(menu){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/${this.props.match.params.locationLink}/dining/${this.props.match.params.permalink}/menus/${menu.url}.json`)
      .then(response => this.setState({ menu: response.data[2].menu_links }))
  }

  displayMenu(){
    const menu = this.state.menu;
    console.log(menu);
    return (
      <div className="menuDisplay card col s7 push-s1">
        {menu.map(object => {
          return (
            <ul className="col s12 ">
              <li className="center-align">
                <b><u>{object.group}</u></b>
              </li>
              <li className="center-align">
                {object.links.map(items => {
                  return(
                    <span>
                      <div className="col s8 left-align">{items.name}</div>
                      <div className="col s2 push-s2 right-align">{items.price}</div>
                    </span>
                  )
                })}
              </li>
            </ul>
          )
        })}
      </div>
    )
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
      <div className="singleRestaurant container">

        <section className="info">
          {!this.state.restaurant.name && this.displayLoader()}
          {this.state.restaurant.name && this.displayState()}
        </section>

        <section className="menu row">
          {this.state.restaurant.menus && this.displayMenuButtons()}
          {this.state.menu.length > 0 && this.displayMenu() }
        </section>

        <section>
          {this.displayComment()}
        </section>

      </div>
    )
  }
}

export default SingleRestaurant
