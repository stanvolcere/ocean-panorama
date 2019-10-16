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
        <div key="7" className="item dropdown">
          <div className="dropbtn"><div className="guests__header__menu__text"> {auth ? auth.name : "Profile"}<i className="dropdown icon"></i></div></div>
          <div className="dropdown-content">
            <Link key="3" to="/bookings" className="item">
              <div className="guests__header__menu__text">My Bookings</div>
            </Link>
            <Link key="4" to="/profile" className="item">
              <div className="guests__header__menu__text">My Profile</div>
            </Link>
          </div>
        </div>
        ,

        <div key="5" className="item">
          <a href="/signout">
            <div className="guests__header__menu__text">Log Out</div>
          </a>
        </div>
      ];
    } else {
      return [
        <Link key="1" to="/signin" className="item" >
          <div className="guests__header__menu__text">Log In/Sign Up</div>
        </Link>
      ];
    }
  }

  renderGuestsHeader() {
    return (
      <div id="guests__header__menu" className="ui secondary menu">
        <Link to="/" className="item">
          <div className="guests__header__menu__text">Ocean Panorama</div>
        </Link>
        <Link to="/rooms/0" className="item">
          <div className="guests__header__menu__text">Rooms</div>
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
