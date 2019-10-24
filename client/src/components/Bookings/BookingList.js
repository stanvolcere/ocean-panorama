import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBookings } from "../../actions";
import { displayDate } from "./utils/dataPickerHelpers";
import requireAuth from "../utils/requireAuth";

class BookingList extends Component {

  state = {
    upcoming: true
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchBookings();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  renderPhotos(imageUrls) {
    return (
      <React.Fragment>
        <img alt="img" className="ui big rounded image" src={imageUrls[0]} />
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
    const { bookings } = this.props;

    if (bookings.length === 0) {
      return <div>You have no upcoming bookings.</div>
    }

    return this.props.bookings.map(booking => {
      return (
        <div key={booking._id} className="ui divided items">
          <div id="booking_list_raised" className="item">
            <div className="ui medium rounded image">
              {this.renderPhotos(booking._room.imageUrls)}
            </div>
            <div className="middle aligned content">
              <Link to={`/rooms/${booking._room._id}`} style={{ fontSize: "2em" }}>
                {booking._room.title}
              </Link>
              <div className="meta">{this.getStatus(booking.status)}</div>
              <div className="description">
                <div>
                  <div>Check In - Check Out</div>
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
                  <div>
                    Total Price : £{booking.price} (£{booking._room.nightlyPrice}
                    /night)
                  </div>
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
      <div id="page__heading__contents" className="ui container">
        <div className="section__heading">Upcoming Bookings</div>
        <Link to="/bookings?filterBookings=all" >All</Link>
        <span></span>
        <Link to="/bookings?filterBookings=upcoming" >Upcoming</Link>
        <div className="booking_list_item_content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bookings, auth }) => {
  return {
    bookings,
    auth
  };
};

// compose from redux lib allows us to have multiple HOCs to our React Componenet
// export default connect(mapStateToProps, actions)(requireAuth(BookingList));
export default connect(mapStateToProps, { fetchBookings })(requireAuth(BookingList));
