import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1" className="item">
            <a href="/auth/google">Log in with Google</a>
          </li>,
          <li key="2" className="item">
            <a href="/auth/facebook">Log in with Facebook</a>
          </li>
        ];
      default:
        return [
          <Link key="3" to="/bookings" className="item">
            My Bookings
          </Link>,
          <li key="4" className="item">
            <a href="/api/logout">Log Out</a>
          </li>
        ];
    }
  }

  renderGuestsHeader() {
    return (
      <div className="ui secondary menu" style={{ fontSize: "1.5rem" }}>
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/rooms/0" className="item">
          Rooms
        </Link>
        <div className="right menu">{this.renderContent()}</div>
      </div>
    )
  }

  render() {
    return (
      this.renderGuestsHeader()
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
