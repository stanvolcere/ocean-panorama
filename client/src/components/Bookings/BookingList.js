import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import * as actions from '../../actions';

class BookingList extends Component{

    componentDidMount() {
        this.props.fetchBookings();
    }

    renderPhotos() {
        return (
            <React.Fragment>
                <img alt="img" className="ui medium rounded image" src="https://via.placeholder.com/600/92c952"></img>
            </React.Fragment>
        )
    }

    displayDate(date) {
        const displayDate = moment(date);
        return displayDate.format('Do MMM YYYY');
    }

    getStatus(status) {
        // {if (booking.status === "Confirmed") ? <span className="ui yellow label">{booking.status}</span> : } 
        if (status === "Confirmed") {
            return <span className="ui green label">{status}</span> 
        }
        return <span className="ui yellow label">{status}</span> 
    }

    renderContent() {
        return this.props.bookings.map((booking) => {
            return (
                <div key={booking._id} className="ui divided items" >
                
                    <div className="item">
                            <div className="image">
                                {this.renderPhotos()}
                            </div>
                            <div className="middle aligned content">
                                <Link className="header large">{booking._room.title}</Link>
                                <div className="meta">
                                    {this.getStatus(booking.status)}
                                </div>
                                <div className="description">
                                    <h5>Check In - Check Out</h5>
                                    <p>{this.displayDate(booking.bookingStartDate)} - {this.displayDate(booking.bookingEndDate)}</p>
                                    <h4>Total Cost : {booking.price}</h4>
                                </div>
                            
                            </div>
                        </div>
                </div>
            )   
        })
    }

    render() {
        return (
            <div className="ui container">
                <h1>Upcoming Bookings</h1> 
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookings: state.bookings
    }
}

export default connect( mapStateToProps, actions )(BookingList);