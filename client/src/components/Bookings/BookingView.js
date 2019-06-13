import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class BookingList extends Component{

    componentDidMount() {
        this.props.fetchBooking();
    }

    renderContent() {

    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {bookings: state.bookings}
}

export default connect( mapStateToProps, actions )(BookingList);