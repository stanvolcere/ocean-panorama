import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";
import "../../styles/styles.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import * as actions from "../../actions";

class BookingCreate extends Component {
  state = {
    createdAt: moment(),
    cleaningFee: 20,
    totalPrice: 0
  };

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchRooms();
    this.props.fetchBlockedDates(this.props.match.params.id);
  }

  // will send us to top of page on compoent mount 
  scrollToTopOnMount() {
    return <ScrollToTopOnMount />
  }

  // this will trigger the create booking form submit
  onSubmit(bookingValues) {
    this.props.createBooking(bookingValues, this.props.auth);
  }

  // details
  renderGuest() {
    if (this.props.auth) {
      return <div>{this.props.auth.name}</div>;
    }
    return <div>Something Went Wrong</div>;
  }

  // renders details on the room in consideration
  renderRoom() {
    if (this.props.room) {
      const { room } = this.props;
      return (
        <div>
          <div>{room.title}</div>

          <div>Amenities</div>
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
          <div>Booking Details</div>
          <div className="ui divider" />
          <div>
            <div>Select Your Dates</div>
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
                bookingStartDate: this.props.datePickerDates.startDate,
                bookingEndDate: this.props.datePickerDates.endDate,
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
    //console.log("hi");
    return this.props.datePickerDates.dateRange * this.props.room.nightlyPrice;
  };

  // could be a separate module
  renderPricing() {
    if (this.props.room && this.props.datePickerDates.dateRange) {
      return (
        <div>
          <div className="booking__pricing">
            <div>
              £{this.props.room.nightlyPrice} x{" "}
              {this.props.datePickerDates.dateRange} nights
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
        <div>Photos</div>
        <div className="ui divider"></div>
        <div className="booking__room_images"  >
          <img alt="" className="ui large rounded image" src={imageUrls[0]} />
        </div>
      </div>
    );
  }

  // renders the booking details
  renderContent() {
    if (this.props.room) {
      const { imageUrls } = this.props.room;

      return (
        <div className="hi ui segment">
          <div>Complete Booking</div>
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

  // main render method
  render() {
    return (
      <div className="ui container">
        {this.scrollToTopOnMount()}
        {this.renderContent()}
      </div>
    )
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
