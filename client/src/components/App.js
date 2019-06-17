import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from "./Header";
import BookingList from './Bookings/BookingList';
import BookingCreate from './Bookings/BookingCreate';
import Landing from '../components/Landing';
import RoomView from './Rooms/RoomView';

class App extends Component {

    componentDidMount() {
        // load the user
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Header />
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/bookings' component={BookingList}/>
                    <Route exact path='/room/book/:id' component={BookingCreate}/>
                    <Route exact path='/rooms/:id' component={RoomView}/>
            </BrowserRouter>
        )   
    }
}

export default connect( null, actions )(App);