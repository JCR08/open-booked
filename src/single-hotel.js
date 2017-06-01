import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import base from './rebase';
var $ = window.jQuery = require('jquery');
var hotels = require('./hotels.json')
var restaurants = require('./restaurants.json')

class SingleHotel extends Component{

  constructor(){
    super()
    this.state={
      user: {},
      comments: [],
      hotel: [{}],
      quickService: [],
      tableService: []
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    let props = this.props
    this.getHotel()
    this.getRestaurants(props)
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/hotel/${this.props.match.params.specifichotel}/comments`, {
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
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    this.newHotel(newProps)
    this.newRestaurants(newProps)
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/hotel/${newProps.match.params.specifichotel}/comments`, {
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

  getHotel(){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/hotels/${this.props.match.params.specifichotel}.json`)
    .then(function(response){
      var hotelMatch = hotels.find(function(elm){
        return elm["place"] === response.data["name"];
      });
      let hotel = response.data
      if(hotelMatch){
        hotel["description"] = hotelMatch["description"]
        hotel["image"] = hotelMatch["image"]
      }
      return hotel
    })
    .then(response => this.setState({hotel: response}))
  }

  getRestaurants() {
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/resort-dining.json`)
    .then(response => response.data.filter(object => object.permalink === this.props.match.params.specifichotel))
    .then(response => {
      let dining = response[0].dinings
      var restaurantMatch = dining.map(elm => {
        var diningMatch = restaurants.find(object => {
          return elm.name === object.place
        })
        let restaurant = elm;
        if (diningMatch) {
          restaurant["description"] = diningMatch["description"]
          restaurant["diningLink"] = diningMatch["diningLink"]
          restaurant["image"] = diningMatch["image"]
          restaurant["locationLink"] = diningMatch["locationLink"]
          restaurant["menus"] = diningMatch["menus"]
          restaurant["price"] = diningMatch["price"]
          restaurant["type"] = diningMatch["type"]
          restaurant["world"] = diningMatch["world"]
        }
        return restaurant
      })
      let quick = restaurantMatch.filter(object => object.description).filter(object => object.type === "Quick Service")
      this.setState({quickService: quick})
      let table = restaurantMatch.filter(object => object.description).filter(object => object.type === "Table Service")
      this.setState({tableService: table})
    })
  }

  newHotel(newProps){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/hotels/${newProps.match.params.specifichotel}.json`)
    .then(function(response){
      var hotelMatch = hotels.find(function(elm){
        return elm["place"] === response.data["name"];
      });
      let hotel = response.data
      if(hotelMatch){
        hotel["description"] = hotelMatch["description"]
        hotel["image"] = hotelMatch["image"]
      }
      return hotel
    })
    .then(response => this.setState({hotel: response}))
  }

  newRestaurants(newProps){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/resort-dining.json`)
    .then(response => response.data.filter(object => object.permalink === newProps.match.params.specifichotel))
    .then(response => {
      let dining = response[0].dinings
      var restaurantMatch = dining.map(elm => {
        var diningMatch = restaurants.find(object => {
          return elm.name === object.place
        })
        let restaurant = elm;
        if (diningMatch) {
          restaurant["description"] = diningMatch["description"]
          restaurant["diningLink"] = diningMatch["diningLink"]
          restaurant["image"] = diningMatch["image"]
          restaurant["locationLink"] = diningMatch["locationLink"]
          restaurant["menus"] = diningMatch["menus"]
          restaurant["price"] = diningMatch["price"]
          restaurant["type"] = diningMatch["type"]
          restaurant["world"] = diningMatch["world"]
        }
        return restaurant
      })
      let quick = restaurantMatch.filter(object => object.description).filter(object => object.type === "Quick Service")
      this.setState({quickService: quick})
      let table = restaurantMatch.filter(object => object.description).filter(object => object.type === "Table Service")
      this.setState({tableService: table})
    })
  }

  displayHotel(){
    const hotel = this.state.hotel;
    return(
      <div className="card row">
        <div className="HotelImage col s6 center-align">
          <img className="responsive-img" src={`${hotel.image}`} alt="#"/>
        </div>
        <div className="restaurantInfo col s6 center-align">
          <h4><u>{hotel.name}</u></h4>
          <p>Phone: ({hotel.phone_number.substring(0,3)}) {hotel.phone_number.substring(3,6)}-{hotel.phone_number.substring(6,10)}</p>
          <p>Price Range: {hotel.cost_range} per night</p>
          <p>{hotel.description}</p>
        </div>
      </div>
    )
  }

  displayQuickService(){
    return (
      <ul className="row col s6">
        <h4 className="center-align">Quick Service Restaurants</h4>
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
        <h4 className="center-align">Table Service Restaurants</h4>
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

  render(){
    return(
      <div className="singleHotel container">

        <section className="info">
          {this.state.hotel.name && this.displayHotel()}
        </section>

        <section className="row">
            {this.state.quickService.length > 0 && this.displayQuickService()}
            {this.state.tableService.length > 0 && this.displayTableService()}
        </section>

        <section>
          {this.displayComment()}
        </section>

      </div>
    )
  }
}

export default SingleHotel
