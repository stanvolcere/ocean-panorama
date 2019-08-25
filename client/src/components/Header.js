import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class Header extends Component {

  renderContent() {
    const { authToken } = this.props;

    if (authToken) {
      return [
        <Link key="3" to="/bookings" className="item">
          <div>My Bookings</div>
        </Link>,
        // <Link key="4" to="/signout" className="item" >
        //   <div>Log Out</div>
        // </Link>,
        <div key="5" className="item">
          <a href="/signout">Log Out</a>
        </div>
      ];
    } else {
      return [
        <Link key="1" to="/signin" className="item" >
          <div>Log In/Sign Up</div>
        </Link>
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

const mapStateToProps = ({ auth, authToken }) => {
  return {
    auth, authToken
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
