import React, { Component } from "react";
import { Link } from 'react-router-dom';


class RoomCard extends Component {

    render() {
        const { room } = this.props;
        return (
            <Link className="room__card" to={`/rooms/${room._id}`} >
                <div className="room__card__image">
                    <img src={room.imageUrls[0]} alt="img"></img>
                </div>
                <div className="room__card__content">
                    <div className="room__card__header">{room.title}</div>
                    <div className="room__card__details">
                        <span>{room.beds} <i class="fas fa-bed"></i></span>
                        <span>{room.baths} <i class="fas fa-shower"></i></span>
                        <span>{room.maxGuests} <i class="fas fa-male"></i></span>
                    </div>
                    <div className="room__card__pricing">
                        <span>£{room.nightlyPrice}/night</span>
                    </div>
                </div>
            </Link >
        )

    }
}

export default RoomCard;