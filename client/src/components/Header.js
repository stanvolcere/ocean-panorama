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
            <a href="/signin">Log In/Sign Up</a>
          </li>,

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
      <div id="guests__header__menu" className="ui secondary menu">
        <Link to="/" className="item">
          Ocean Panorama
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
