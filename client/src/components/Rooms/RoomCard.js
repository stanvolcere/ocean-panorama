import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";

class RoomCard extends Component {

    render() {
        const { room } = this.props;
        return (
            <div className="room__card">
                <div>{room.title}</div>
                <div>{room.beds}</div>
                <div>{room.baths}</div>
            </div>
        )

    }
}

export default RoomCard;