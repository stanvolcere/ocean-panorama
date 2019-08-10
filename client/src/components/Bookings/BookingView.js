import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { displayDate } from "./utils/dataPickerHelpers";
import ScrollTopTopOnMount from "../utils/ScrollToTopOnMount";

class BookingList extends Component {
  componentDidMount() {
    this.props.fetchBookings();
  }

  renderPhotos(imageUrls) {
    return <div>
      <img alt="img" className="ui big rounded image" src={imageUrls[0]} />
    </div>
  }

  renderContent() {
    const { booking } = this.props;

    if (booking) {
      return (
        <div className="ui container">
          <div className="section__heading">Booking Detail View</div>
          <div className="booking__details__main">
            <div>
              {this.renderPhotos(booking._room.imageUrls)}
            </div>
            <div className="booking__details__main__content">
              <p>Room: {booking._room.title}</p>
              <p>
                Dates: {displayDate(booking.bookingStartDate)} -{" "}
                {displayDate(booking.bookingEndDate)}
              </p>
              <p>Total Price: £{booking.price}</p>
              <div className="ui divider"></div>
              <Link to={`/bookings/changedates/${booking._id}`}>
                <button className="ui inverted secondary button">
                  Change Dates
                </button>
              </Link>
              <Link to={`/bookings/cancel/${booking._id}`}>
                <button className="ui inverted red button">Cancel Booking</button>
              </Link>
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

export default connect(
  mapStateToProps,
  actions
)(BookingList);
