import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import ScrollToTopOnMount from "../utils/ScrollToTopOnMount";
import requireAuth from '../utils/requireAuth';

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

  componentWillUnmount() {
    this.props.clearSelectedDates();
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
        <div className="booking__render__room">
          <div>{room.title}</div>
          <div className="booking__room__details">
            <p>{room.bedrooms} <i className="bed icon"></i></p>
            <p>{room.beds} <i className="shower icon"></i></p>
            <p>{room.maxGuests} <i className="male icon"></i></p>
          </div>
        </div>
      );
    }
    return <div>Something Went Wrong</div>;
  }

  renderBookingDetails() {
    // before this is rendered we wanna get the blocked days of the roomId
    return (
      <div className="ui segment">
        <div className="booking__details">
          <div>
            {this.renderGuest()}
            <div className="ui divider" />
            <div className="content__heading__sub">Room</div>
            {this.renderRoom()}
            <div className="ui divider" />
            <div className="content__heading__sub">Select Your Dates</div>
            <CustomDatePicker
              roomId={this.props.match.params.id}
              blockedDates={this.props.blockedDates}
            />
            <div className="ui divider" />
            <div>
              <div className="content__heading__sub">Price</div>
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
      </div>
    );
  }

  calculatePrice = () => {
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
            <div>£{this.calculatePrice()}</div>
          </div>
          <div className="booking__pricing">
            <div>Cleaning Fees</div>
            <div>£20</div>
          </div>
          <div className="ui divider" />
          <div className="booking__pricing">
            <div className="content__heading__sub">Total Price</div>
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
        <div className="content__heading__sub">Room Photos</div>
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
        <div id="new__booking__container" className="ui segment">
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
        <div className="section__heading">Complete Booking</div>
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

export default connect(mapStateToProps, actions)(requireAuth(BookingCreate));
