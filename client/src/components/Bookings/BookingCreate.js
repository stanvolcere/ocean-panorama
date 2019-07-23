import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import "../../styles/styles.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import * as actions from "../../actions";
import { OPEN_UP } from "react-dates/lib/constants";

class BookingCreate extends Component {
  state = {
    createdAt: moment(),
    calenderFocused: null,
    startDate: moment(),
    endDate: moment(),
    dateRange: 0,
    cleaningFee: 20,
    totalPrice: 0
  };

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchRooms();
    this.props.fetchBlockedDates(this.props.match.params.id);
  }

  onSubmit(bookingValues) {
    this.props.createBooking(bookingValues, this.props.auth);
  }

  renderGuest() {
    if (this.props.auth) {
      return <h2>{this.props.auth.name}</h2>;
    }
    return <div>Something Went Wrong</div>;
  }

  // renders details on the room in consideration
  renderRoom() {
    if (this.props.room) {
      const { room } = this.props;
      return (
        <div>
          <h3>{room.title}</h3>

          <h4>Amenities</h4>
          <div className="booking__room">
            <p>Bedrooms: {room.bedrooms}</p>
            <p>Beds: {room.beds}</p>
            <p>Baths: {room.baths}</p>
          </div>
        </div>
      );
    }
    return <div>Something Went Wrong</div>;
  }

  renderBookingDetails() {
    // before this is rendered we wanna get the blocked days of the roomId
    return (
      <div className="booking__details ui segment">
        <div>
          <h2>Booking Details</h2>
          <div className="ui divider" />
          <div>
            <h4>Select Your Dates</h4>
          </div>
          <CustomDatePicker
            roomId={this.props.match.params.id}
            blockedDates={this.props.blockedDates}
          />
          <div className="ui divider" />
          <div>
            <h4>Price</h4>
          </div>
          {this.renderPricing()}
        </div>
        <div>
          <button
            className="ui primary right floated button"
            onClick={() =>
              this.onSubmit({
                status: "Pending",
                _room: this.props.room,
                bookingStartDate: this.state.startDate,
                bookingEndDate: this.state.endDate,
                createdOn: this.state.createdAt,
                price: this.calculatePrice() + this.state.cleaningFee
              })
            }
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  calculatePrice = () => {
    return this.state.dateRange * this.props.room.nightlyPrice;
  };

  // could be a separate module
  renderPricing() {
    if (this.props.room && this.state.dateRange) {
      return (
        <div>
          <div className="booking__pricing">
            <div>
              £{this.props.room.nightlyPrice} x {this.state.dateRange} nights
            </div>
            <div style={{ fontSize: "1.5rem" }}>£{this.calculatePrice()}</div>
          </div>
          <div className="booking__pricing">
            <div>Cleaning Fees</div>
            <div style={{ fontSize: "1.5rem" }}>£20</div>
          </div>
          <div className="ui divider" />
          <div className="booking__pricing">
            <div>Total Price</div>
            <div>£{this.calculatePrice() + this.state.cleaningFee}</div>
          </div>
        </div>
      );
    }
    return <div>Choose Dates to calculate price</div>;
  }

  renderPhotos(imageUrls) {
    return (
      <div className="ui segment">
        <h2>Photos</h2>
        <div className="ui divider" />
        <img alt="" className="ui medium rounded image" src={imageUrls[0]} />
      </div>
    );
  }

  // this function here is not needed in the create booking feature because we will
  // not have an already selected date range for this new booking
  getBlockedDates() {
    //console.log(this.props.blockedDates.length);console.log(this.props.blockedDates);
    if (this.props.blockedDates.length > 0) {
      return this.props.blockedDates.filter(
        date =>
          !moment(date.bookingStartDate).isSame(
            this.props.booking.bookingStartDate
          )
      );
    }
  }

  // renders the booking details
  renderContent() {
    if (this.props.room) {
      const { imageUrls } = this.props.room;

      return (
        <div className="hi ui segment">
          <h2>Complete Booking</h2>
          <div className="ui divider" />
          {this.renderGuest()}
          <div className="ui divider" />
          {this.renderRoom()}
          <div className="ui divider" />

          <div className="ui two column very relaxed stackable grid">
            <div className="column">{this.renderPhotos(imageUrls)}</div>
            <div className="column">{this.renderBookingDetails()}</div>
          </div>
        </div>
      );
    }
  }

  // react dates datepicker helper functions
  setDateDiff = (startDate, endDate) => {
    const range = endDate.diff(startDate, "days");
    this.setState(() => ({ dateRange: range }));
  };

  isDayBlocked = day => {
    let hit = false;

    // once we have our start date seleced all dates before said date will be blocked
    if (this.state.startDate && this.state.calenderFocused === "endDate") {
      //from our blocked dates list find the next blocked date in relation to the startDate selected
      let nextBlockedDate = this.props.blockedDates.find(blockedDate => {
        return moment(blockedDate.bookingStartDate).isAfter(
          this.state.startDate
        );
      });

      if (nextBlockedDate) {
        if (day.isSameOrAfter(nextBlockedDate.bookingStartDate)) {
          return true;
        }
      }

      if (day.isBefore(this.state.startDate)) {
        return true;
      }
    }

    // this will display the regular blocked dates according to the previous bookings
    if (this.props.blockedDates) {
      this.props.blockedDates.forEach(blockedDate => {
        if (
          day.isSameOrBefore(blockedDate.bookingEndDate) &&
          day.isSameOrAfter(blockedDate.bookingStartDate)
        ) {
          hit = true;
        }
      });

      return hit;
    }
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState(() => ({ startDate, endDate }));

    if (startDate && endDate) {
      this.setDateDiff(startDate, endDate);
    }
  };

  onFocusChange = focusedInput => {
    this.setState(() => ({ calenderFocused: focusedInput }));
  };

  // main render method
  render() {
    return <div className="ui container">{this.renderContent()}</div>;
  }
}

const mapStateToProps = (
  { auth, rooms, blockedDates, datePickerDates },
  ownProps
) => {
  return {
    auth,
    room: rooms.find(room => room._id === ownProps.match.params.id),
    blockedDates,
    datePickerDates
  };
};

export default connect(
  mapStateToProps,
  actions
)(BookingCreate);
