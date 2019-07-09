import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import * as actions from "../../actions";
import history from "../../history";

class BookingDelete extends Component {
  renderContent() {
    return `Are you sure you want to cancel your booking?`;
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.cancelBooking(id)}
          className="ui button negative"
        >
          Cancel Booking
        </button>
        <Link to="/bookings" className="ui button">
          Dismiss
        </Link>
      </React.Fragment>
    );
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <Modal
        title="Cancel Booking"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => {
          history.push(`/bookings/${id}`);
        }}
      />
    );
  }
}

export default connect(
  null,
  actions
)(BookingDelete);
