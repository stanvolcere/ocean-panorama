import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchRooms } from "../../actions";

class RoomCard extends Component {

    render() {
        const { room } = this.props;
        return (
            <Link to={`/rooms/${room._id}`} >
                <div className="room__card">
                    <div className="room__card__image">
                        <img src={room.imageUrls[0]}></img>
                    </div>
                    <div className="room__card__content">
                        <div className="room__card__header">{room.title}</div>
                        <div className="room__card__details">
                            <span>{room.beds} <i className="bed icon"></i></span>
                            <span>{room.baths} <i className="shower icon"></i></span>
                            <span>{room.maxGuests} <i className="male icon"></i></span>
                        </div>
                        <div className="room__card__pricing">
                            <span>£{room.nightlyPrice}/night</span>
                        </div>
                    </div>
                </div>
            </Link >
        )

    }
}

export default RoomCard;