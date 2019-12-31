import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import CustomDatePicker from "../DatePicker/CustomDatePicker";
import SelectAmountOfGuests from "./utils/SelectAmountOfGuests";
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
    totalPrice: 0,
    numberOfGuests: 0
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
            <p>{room.bedrooms} <i class="fas fa-bed"></i></p>
            <p>{room.beds} <i class="fas fa-shower"></i></p>
            <p>{room.maxGuests} <i class="fas fa-male"></i></p>
          </div>
        </div>
      );
    }
    return <div>Something Went Wrong</div>;
  }

  incrementGuests = () => {
    if (this.state.numberOfGuests <= this.props.maxGuests) {
      return this.setState({ numberOfGuests: this.state.numberOfGuests + 1 })
    }
    return this.setState({ numberOfGuests: this.state.numberOfGuests })
  }

  decrementGuests = () => {
    if (this.state.numberOfGuests > 0) {
      return this.setState({ numberOfGuests: this.state.numberOfGuests - 1 })
    }
    return this.setState({ numberOfGuests: this.state.numberOfGuests })
  }

  renderSelectNumberOfGuests() {
    const { room } = this.props;
    if (room) {
      return (
        <SelectAmountOfGuests
          numberOfGuests={this.state.numberOfGuests}
          setUpGuests={() => { this.setState({ numberOfGuests: room.maxGuests }) }}
          incrementGuests={this.incrementGuests}
          decrementGuests={this.decrementGuests}
        />
      )
    }
  }

  renderSubmitButton() {
    const { datePickerDates: { startDate, endDate, dateRange }, form } = this.props;
    let disabled = true;

    if (startDate && endDate && form.guestSelectForm.values) {
      disabled = false;
    }

    return (
      <div className="booking__confirm__button">

        <button
          className={`button`}
          disabled={disabled}
          onClick={() =>
            this.onSubmit({
              status: "Pending",
              _room: this.props.room,
              bookingStartDate: startDate,
              bookingEndDate: endDate,
              numberOfNights: dateRange,
              createdOn: this.state.createdAt,
              price: this.calculatePrice() + this.state.cleaningFee,
              numberOfGuests: parseInt(form.guestSelectForm.values.numberOfGuests)
            })
          }
        >
          Confirm
        </button>
      </div >
    )
  }

  renderBookingDetails() {
    // before this is rendered we wanna get the blocked days of the roomId
    return (
      <div className="booking__details">
        <div>
          {this.renderGuest()}
          <div className="content__heading__sub">Room</div>
          {this.renderRoom()}
          <div className="content__heading__sub">Select Your Dates</div>
          <CustomDatePicker
            roomId={this.props.match.params.id}
            blockedDates={this.props.blockedDates}
          />
          <div className="content__heading__sub">Number of Guests</div>
          {this.renderSelectNumberOfGuests()}
          <div>
            <div className="content__heading__sub">Price</div>
          </div>
          {this.renderPricing()}
        </div>
        {this.renderSubmitButton()}
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

  renderPhotos(roomId, imageUrls) {
    return (
      <Link to={`/gallery/${roomId}?returnUrl=/room/book/${roomId}`}>
        <div className="room__details__image"><img src={imageUrls[0]} alt="img"></img></div>
      </Link>
    );
  }

  renderContent() {
    if (this.props.room) {
      const { _id, imageUrls } = this.props.room;
      return (
        <div id="new__booking__container">
          {this.renderPhotos(_id, imageUrls)}
          {this.renderBookingDetails()}
        </div>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Link className="" to={`/rooms/0`}>
          <i
            className="booking__details__back__button huge arrow alternate circle left outline icon"
            data-content="Hello. This is an inverted popup"
            data-variation="basic"
          />
        </Link>
        <div className="container">
          {this.scrollToTopOnMount()}
          <div className="section__heading">Book Listing</div>
          {this.renderContent()}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (
  { auth, rooms, blockedDates, datePickerDates, form },
  ownProps
) => {
  return {
    auth,
    room: rooms.find(room => room._id === ownProps.match.params.id),
    blockedDates,
    datePickerDates,
    form
  };
};

export default connect(mapStateToProps, actions)(requireAuth(BookingCreate));
