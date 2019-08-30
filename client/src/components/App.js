import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

import Header from "./Header";
import Landing from "../components/Landing";
import BookingList from "./Bookings/BookingList";
import BookingCreate from "./Bookings/BookingCreate";
import BookingView from "./Bookings/BookingView";
import BookingEdit from "./Bookings/BookingEdit";
import BookingDelete from "./Bookings/BookingDelete";

import RoomView from "./Rooms/RoomView";

import PageNotFound from "./PageNotFound";
import history from "../history";
import SignInModal from "./Auth/SignInModal";
import AfterSignIn from "./Auth/AfterSignIn";
import SignOut from "./Auth/SignOut";
import SendEnquiryModal from "./Enquiry/SendEnquiryModal";
import FlashMessage from "./FlashMessage";
import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    // load the user
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history} >
        <div className="main__styling__after__root">
          <Header />
          <FlashMessage />
          <div className="content__on__any__page">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/signin" component={SignInModal} />
              <Route exact path="/aftersignin" component={AfterSignIn} />
              <Route exact path="/signout" component={SignOut} />

              <Route exact path="/bookings" component={BookingList} />
              <Route exact path="/bookings/:id" component={BookingView} />
              <Route
                exact
                path="/bookings/changedates/:id"
                component={BookingEdit}
              />
              <Route exact path="/bookings/cancel/:id" component={BookingDelete} />
              <Route exact path="/room/book/:id" component={BookingCreate} />
              <Route exact path="/rooms/:id" component={RoomView} />
              <Route exect path="/enquiry/:id" component={SendEnquiryModal}></Route>

              <Route component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router >
    );
  }
}

export default connect(
  null,
  actions
)(App);
