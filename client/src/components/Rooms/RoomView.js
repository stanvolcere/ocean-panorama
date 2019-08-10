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
      const { room } = this.props;
      return (
        <div class="room__display">
          <div className="room__display__header">{room.title}</div>
        </div>
      );
    }
    return <div>Something went wrong.</div>;
  }

  // this renders the left list of rooms
  renderLeftContent() {
    return <RoomList />
  }

  render() {

    return (
      <div id="page__heading__contents" className="ui container">
        <ScrollToTopOnMount />
        <div className="section__heading">Our Rooms</div>
        <div className="ui grid">
          <div className="six wide column room__view__list">{this.renderLeftContent()}</div>
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
