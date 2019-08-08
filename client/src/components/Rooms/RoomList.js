import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRooms } from "../../actions";
import BookRoomButton from "./BookRoomButton";
import RoomCard from "./RoomCard";

class RoomList extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    if (this.props.rooms) {
      const { rooms } = this.props;
      return rooms.map(room => {
        return (
          <React.Fragment>
            <RoomCard room={room} />
          </React.Fragment>
        );
      });
    }
  }
}

function mapStateToProps({ rooms }) {
  return { rooms };
}

export default connect(
  mapStateToProps,
  { fetchRooms }
)(RoomList);
