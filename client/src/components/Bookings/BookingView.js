import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { displayDate } from "./utils/dataPickerHelpers";
import ScrollTopTopOnMount from "../utils/ScrollToTopOnMount";
import Payments from "../Payments/Payments";
import requireAuth from "../utils/requireAuth";

class BookingView extends Component {
  componentDidMount() {
    this.props.fetchBookings();
  }

  renderPhotos(roomId, imageUrls, bookingId) {
    return <Link to={`/gallery/${roomId}?returnUrl=/bookings/${bookingId}`}>
      <div className="ui big rounded image"><img src={imageUrls[0]} alt="img"></img></div>
    </Link>
  }

  renderPaymentAction(isPaid) {
    if (!isPaid) {
      return <Payments bookingId={this.props.booking._id} price={this.props.booking.price} />
    }
    return;
  }

  renderContent() {
    const { booking } = this.props;

    if (booking) {
      return (
        <div id="booking__details__main__container" className="ui container">
          <div className="section__heading">Booking Details</div>
          <div className="booking__details__main">
            <div>
              {this.renderPhotos(booking._room._id, booking._room.imageUrls, booking._id)}
            </div>
            <div className="booking__details__main__content">
              <p>Room: {booking._room.title}</p>
              <p>
                Dates: {displayDate(booking.bookingStartDate)} -{" "}
                {displayDate(booking.bookingEndDate)}
              </p>
              <p>Duration: {booking.numberOfNights} nights</p>
              <p>Total Price: £{booking.price}</p>
              <div className="ui divider"></div>
              {this.renderPaymentAction(booking.paid)}
              <Link to="#">
                <button className="ui teal button">
                  <span>Message Host</span>
                </button>
              </Link>
              <div className="ui compact menu">
                <div className="ui simple dropdown item">
                  <span>Booking Options</span>
                  <div className="menu">
                    <div className="item">
                      <Link to={`/bookings/changedates/${booking._id}`}>
                        Change Dates
                      </Link></div>
                    <div className="item">
                      <Link to={`/bookings/cancel/${booking._id}`}>
                        Cancel Booking
                      </Link>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      );
    }
    return "Something went wrong. Try refreshing";
  }

  render() {
    // will scroll the page to top of page when we first mount the component using - <ScrollTopTopOnMount />
    return (
      <div>
        <ScrollTopTopOnMount />
        <Link className="" to="/bookings">
          <i
            className="booking__details__back__button huge arrow alternate circle left outline icon"
            data-content="Hello. This is an inverted popup"
            data-variation="basic"
          />
        </Link>

        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ bookings }, ownProps) => {
  return {
    booking: bookings.find(booking => booking._id === ownProps.match.params.id)
  };
};

export default connect(mapStateToProps, actions)(requireAuth(BookingView));
