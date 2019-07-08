import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";
import RoomList from "./RoomList";
import RoomDetail from "./RoomDetail";

class RoomView extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  // main content holding the currently selected room
  renderContent() {
    if (this.props.room) {
      return (
        <div
          className="ui segment"
          style={{ position: "fixed", width: "55%", height: "85%" }}
        >
          <RoomDetail id={this.props.room._id} />
        </div>
      );
    }
    return <div>Something went wrong.</div>;
  }

  // this renders the left list of rooms
  renderLeftContent() {
    return <RoomList />;
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="six wide column">{this.renderLeftContent()}</div>

          <div className="eight wide column">{this.renderContent()}</div>
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
