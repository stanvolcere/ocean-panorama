import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class Header extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    const { authToken, auth } = this.props;

    if (authToken) {
      return [
        <div key="7" className="guests__header__content__item dropdown">
          <div className="dropbtn"><div> {auth ? auth.name : "Profile"}<i className="dropdown icon"></i></div></div>
          <div className="dropdown-content">
            <Link key="3" to="/bookings" className="guests__header__content__item">
              My Bookings
            </Link>
            <Link key="4" to="/profile" className="guests__header__content__item">
              My Profile
            </Link>
          </div>
        </div>
        ,
        <div key="5" className="guests__header__content__item">
          <a href="/signout">
            Log Out
          </a>
        </div>
      ];
    } else {
      return [
        <Link key="1" to="/signin" className="guests__header__content__item" >
          Log In/Sign Up
        </Link>
      ];
    }
  }

  renderGuestsHeader() {
    return (
      <div id="guests__header__menu">
        <div className="guests__header__content">
          <Link to="/" className="guests__header__content__item">
            <div>Ocean Panorama</div>
          </Link>
          <Link to="/rooms/0" className="guests__header__content__item">
            <div>Rooms</div>
          </Link>
        </div>
        <div className="guests__header__content">
          {this.renderContent()}
        </div>

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
