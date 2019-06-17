import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class BookingList extends Component{

    componentDidMount() {
        this.props.fetchBookings();
    }

    render() {
        return (
            <div>
                List of booking
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {bookings: state.bookings}
}

export default connect( mapStateToProps, actions )(BookingList);