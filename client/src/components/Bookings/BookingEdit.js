import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import Modal from "../Modal";
import * as actions from "../../actions";
import history from "../../history";
import { displayDate, getDateDiff } from "../Bookings/utils/dataPickerHelpers";

class BookingEdit extends Component {
  state = {
    showDateWarning: false
  };

  componentDidMount() {
    this.props.fetchBookings();
    if (this.props.booking) {
      this.props.fetchBlockedDates(this.props.booking._room._id);
    }
  }

  getBlockedDates() {
    if (this.props.blockedDates) {
      return this.props.blockedDates.filter(
        date =>
          !moment(date.bookingStartDate).isSame(
            this.props.booking.bookingStartDate
          )
      );
    }
  }

  calculatePrice = (startDate, endDate) => {
    // note the 20 here is the cleaning fee - TODO change the cleaning fee to a configurable value
    return (
      getDateDiff(startDate, endDate) * this.props.booking._room.nightlyPrice +
      20
    );
  };

  onSubmitClick(id, startDate, endDate) {
    if (startDate && endDate) {
      return this.props.updateBookingDates(id, {
        bookingStartDate: startDate.format(),
        bookingEndDate: endDate.format(),
        price: this.calculatePrice(startDate, endDate)
      });
    }
    this.setState({ showDateWarning: true });
  }

  renderPricing() {
    const { startDate, endDate } = this.props.datePickerDates;

    if (startDate && endDate) {
      return (
        <h3>
          Price for new dates: £{this.calculatePrice(startDate, endDate)} (£
          {this.props.booking._room.nightlyPrice}/night incl. Fees)
        </h3>
      );
    }
  }

  renderWarning() {
    if (this.state.showDateWarning) {
      return (
        <div className="ui warning message">
          <div className="header">
            Make sure you select a Start Date and End Date before submittingthe
            changes!
          </div>
        </div>
      );
    }
  }

  renderContent() {
    console.log(this.getBlockedDates());

    if (this.props.booking) {
      return (
        <div>
          <h4>{`Your current dates are: ${displayDate(
            this.props.booking.bookingStartDate
          )} - ${displayDate(this.props.booking.bookingEndDate)}`}</h4>
          <CustomDatePicker
            roomId={this.props.booking._room._id}
            blockedDates={this.getBlockedDates()}
          />
          {this.renderPricing()}
          {this.renderWarning()}
        </div>
      );
    }
    return <div />;
  }

  renderActions() {
    // the id here hold the booking id
    const { id } = this.props.match.params;
    const { startDate, endDate } = this.props.datePickerDates;

    return (
      <React.Fragment>
        <button
          onClick={() => {
            this.onSubmitClick(id, startDate, endDate);
          }}
          className="ui button primary"
        >
          Submit Changes
        </button>
        <Link to={`/bookings/${id}`} className="ui button">
          Dismiss
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Change Booking Dates"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => {
          history.push("/bookings/" + this.props.booking._id);
        }}
      />
    );
  }
}

const mapStateToProps = (
  { bookings, datePickerDates, blockedDates },
  ownProps
) => {
  return {
    booking: bookings.find(booking => booking._id === ownProps.match.params.id),
    blockedDates,
    datePickerDates
  };
};

export default connect(
  mapStateToProps,
  actions
)(BookingEdit);
