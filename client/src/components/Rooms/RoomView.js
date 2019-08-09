import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";
import RoomList from "./RoomList";
import RoomDetail from "./RoomDetail";

import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";

class RoomView extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  // main content holding the currently selected room
  renderRightContent() {
    if (this.props.room) {
      return (
        <div className="room__display"></div>
      );
    }
    return <div>Something went wrong.</div>;
  }

  // this renders the left list of rooms
  renderLeftContent() {
    // console.log(document.querySelector("#page__heading__contents"))
    // console.log(window);
    return <RoomList />;
  }

  render() {

    return (
      <div id="page__heading__contents" className="ui container">
        <ScrollToTopOnMount />
        <div className="section__heading">Our Rooms</div>
        <div className="ui grid">
          <div className="six wide column">{this.renderLeftContent()}</div>
          <div className="eight wide column">{this.renderRightContent()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ rooms }, ownProps) {
  return {
    rooms,
    // sets a default initial state for the room to be displayed
    room: rooms.find(room => room._id === ownProps.match.params.id) || rooms[0]
  };
}

export default connect(
  mapStateToProps,
  { fetchRooms }
)(RoomView);
