import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

import Header from "./Header";
import BookingList from "./Bookings/BookingList";
import BookingCreate from "./Bookings/BookingCreate";
import Landing from "../components/Landing";
import RoomView from "./Rooms/RoomView";

import history from "../history";
import BookingView from "./Bookings/BookingView";

class App extends Component {
  componentDidMount() {
    // load the user
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/bookings" component={BookingList} />
          <Route exact path="/bookings/:id" component={BookingView} />
          <Route exact path="/room/book/:id" component={BookingCreate} />
          <Route exact path="/rooms/:id" component={RoomView} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
