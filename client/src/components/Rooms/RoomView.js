import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchRooms } from "../../actions";
import RoomList from "./RoomList";
import BookRoomButton from "./BookRoomButton";
import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";

class RoomView extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  // will send us to top of page on compoent mount 
  scrollToTopOnMount() {
    return <ScrollToTopOnMount />
  }

  renderActions(room) {
    return (
      <div className="room__display__actions">
        <Link to={`/enquiry/${room._id}`}><button className="ui yellow button">Make Enquiry</button></Link>
        <BookRoomButton roomId={room._id} />
      </div>
    )
  }

  renderRoomDetails(room) {
    return <div className="room__details__info">
      <span>{room.beds} <i className="bed icon"></i></span>
      <span>{room.baths} <i className="shower icon"></i></span>
      <span>{room.maxGuests} <i className="male icon"></i></span>
    </div>
  }

  renderPhotos(roomId, imageUrls) {
    if (imageUrls) {
      return (<div className="ui large rounded image">
        <Link to={`/gallery/${roomId}?returnUrl=/rooms/${roomId}`}><img src={imageUrls[0]} alt="img"></img></Link>
      </div>)
    }
    return <div></div>
  }

  // main content holding the currently selected room
  renderRightContent() {
    if (this.props.room) {
      const { room } = this.props;
      return (
        <div className="room__display">
          <div>
            <div className="room__display__header">{room.title}</div>
            <div className="room__display__sub">{room.description}</div>
          </div>
          <div className="ui divider" />
          <div className="room__display__content">
            {this.renderPhotos(room._id, room.imageUrls)}
            <div className="room__display__details">
              <div className="content__heading__sub">Room Details</div>
              {this.renderRoomDetails(room)}
            </div>
          </div>
          <div className="ui divider"></div>
          <div>
            {this.renderActions(room)}
          </div>
        </div >
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
        {this.scrollToTopOnMount()}
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
