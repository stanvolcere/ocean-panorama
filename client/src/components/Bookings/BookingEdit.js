import React, { Component } from "react";
import { connect } from "react-redux";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import * as actions from "../../actions";

class BookingEdit extends Component {
  componentDidMount() {
    this.props.fetchBookings();
  }

  render() {
    if (this.props.booking) {
      return <CustomDatePicker roomId={this.props.booking._room._id} />;
    }
    return <div />;
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
)(BookingEdit);
