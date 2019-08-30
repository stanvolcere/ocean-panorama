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
          <div className="dropbtn">{auth ? auth.name : "Profile"}<i className="dropdown icon"></i></div>
          <div className="dropdown-content">
            <Link key="3" to="/bookings" className="item">
              <div>My Bookings</div>
            </Link>
            <Link key="4" to="#" className="item">
              <div>My Profile</div>
            </Link>
          </div>
        </div>
        ,

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
