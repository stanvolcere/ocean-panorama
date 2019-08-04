import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { displayDate } from "./utils/dataPickerHelpers";

class BookingList extends Component {
  componentDidMount() {
    this.props.fetchBookings();
  }

  renderPhotos(imageUrls) {
    return (
      <React.Fragment>
        <img alt="img" className="ui medium rounded image" src={imageUrls[0]} />
      </React.Fragment>
    );
  }

  getStatus(status) {
    if (status === "Confirmed") {
      return <span className="ui green label">{status}</span>;
    }
    return <span className="ui yellow label">{status}</span>;
  }

  renderContent() {
    return this.props.bookings.map(booking => {
      return (
        <div key={booking._id} className="ui divided items">
          <div id="booking_list_raised" className="item">
            <div className="ui medium rounded image">
              {this.renderPhotos(booking._room.imageUrls)}
            </div>
            <div className="middle aligned content">
              <Link to={`/rooms/${booking._room._id}`} className="header large">
                {booking._room.title}
              </Link>
              <div className="meta">{this.getStatus(booking.status)}</div>
              <div className="description">
                <div>
                  <h5>Check In - Check Out</h5>
                  <p>
                    {displayDate(booking.bookingStartDate)} -{" "}
                    {displayDate(booking.bookingEndDate)}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <h4>
                    Total Cost : £{booking.price} (£{booking._room.nightlyPrice}
                    /night)
                  </h4>
                  <div className="booking_list_buttons">
                    <Link to={`/bookings/${booking._id}`}>
                      <button className="ui inverted primary button">
                        View Booking Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui container">
        <h1>Upcoming Bookings</h1>
        <div className="booking_list_item_content">
          {this.renderContent()}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookings: state.bookings
  };
};

export default connect(
  mapStateToProps,
  actions
)(BookingList);
