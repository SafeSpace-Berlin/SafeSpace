import React, { Component } from "react";
import "./Room.scss";
import { useParams } from "react-router-dom";
var config = require("../../config");

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(config.url + "rooms/" + id, {
      method: "get",
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let room = data.room;
        this.setState({ room: room });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    let room = this.state.room;
    return (
      <div id="room">
        {room && (
          <div className="field" key={room._id}>
            <img src={room.photo} alt=""></img>
            <h2>availableFrom: {room.availableFrom}</h2>
            <h2>availableTo: {room.availableTo}</h2>
            <h2>city: {room.city}</h2>
            <h2>country: {room.country}</h2>
            <h2>district: {room.district}</h2>
            <h2>price: {room.price}</h2>
          </div>
        )}
      </div>
    );
  }
}
