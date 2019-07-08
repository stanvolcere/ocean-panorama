import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { displayDate } from "./utils/dataPickerHelpers";

class BookingList extends Component {
  componentDidMount() {
    this.props.fetchBookings();
  }

  renderContent() {
    if (this.props.booking) {
      return (
        <div className="ui container">
          <h1>Booking Detail View</h1>
          <p>Room: {this.props.booking._room.title}</p>
          <p>
            Dates: {displayDate(this.props.booking.bookingStartDate)} -{" "}
            {displayDate(this.props.booking.bookingEndDate)}
          </p>
          <p>Total Price: {this.props.booking.price}</p>

          <Link to={`/bookings/changedates/${this.props.booking._id}`}>
            <button className="ui inverted secondary button">
              Change Dates
            </button>
          </Link>
          <Link to={`/bookings/cancel/${this.props.booking._id}`}>
            <button className="ui inverted red button">Cancel Booking</button>
          </Link>
        </div>
      );
    }
    return "Something went wrong. Try refreshing";
  }

  render() {
    return <div>{this.renderContent()}</div>;
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
