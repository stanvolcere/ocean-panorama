import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import * as actions from '../../actions';
import { OPEN_UP } from 'react-dates/lib/constants';



class BookingCreate extends Component{

    state = {
        createdAt: moment(),
        calenderFocused: null,
        startDate: moment(),
        endDate: moment(),
        dateRange: 0,
        cleaningFee: 20,
        totalPrice: 0
    };

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchRooms();
    }

    onSubmit(bookingValues) {
        this.props.createBooking(bookingValues);
    }

    renderContent() {
        
        return (
            <div className="ui segment" >
                <h2>Complete Booking</h2> 
                <div className="ui divider"></div>
                {this.renderGuest()}
                <div className="ui divider"></div>
                {this.renderRoom()}
                <div className="ui divider"></div>
                
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                            {this.renderPhotos()}
                        </div>
                        <div className="column">      
                            {this.renderBookingDetails()}
                        </div>
                
                </div>
                
            </div>
        )
    }

    renderGuest() {
        if (this.props.auth) {
            return <h2>{this.props.auth.name}</h2>
        }
        return (
            <div>Something Went Wrong</div>
        )
    }

    renderRoom() {
        if (this.props.room) {
            const { room } = this.props;
            return (
                <div>
                    <h3>{room.title}</h3>

                    <h4>Amenities</h4>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <p>Bedrooms: {room.bedrooms}</p>
                        <p>Beds: {room.beds}</p>
                        <p>Baths: {room.baths}</p>
                    </div>
                    
                </div>
            )
        }
        return (
            <div>Something Went Wrong</div>
        )
        
    }
    
    setDateDiff = (startDate, endDate) => {
        const range = endDate.diff(startDate, 'days');
        this.setState(() => ({ dateRange: range }));
    };

    calculatePrice = () => {
        return this.state.dateRange * this.props.room.nightlyPrice;
    }

    onDatesChange = ({startDate, endDate}) => {

        this.setState(() => ({ startDate, endDate }));

        if (startDate && endDate) {
            this.setDateDiff(startDate, endDate);
        }
    }

    onFocusChange = (focusedInput) => {
        this.setState(() => ({ calenderFocused: focusedInput }));
    }

    renderBookingDetails() {    
        return(
            <div className="ui segment" style={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <div>
                    <h2>Booking Details</h2>
                    <div className="ui divider"></div>
                    <div><h4>Select Your Dates</h4></div>
                    <DateRangePicker 
                        startDate = {this.state.startDate}
                        startDateId="your_unique_start_date_id"
                        endDate = {this.state.endDate}
                        endDateId="your_unique_end_date_id"
                        onDatesChange = {this.onDatesChange}
                        focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                        openDirection={OPEN_UP}
                    />
                    <div className="ui divider"></div>
                    <div><h4>Price</h4></div>
                    {this.renderPricing()}
                </div>
                <div>
                    <button className="ui primary right floated button" onClick={() => {this.onSubmit({
                        status: "Pending",
                        _room: this.props.room._id,
                        price: this.calculatePrice() + this.state.cleaningFee,
                        bookingStartDate: this.state.startDate,
                        bookingEndDate: this.state.endDate,
                        createdOn: moment()
                    })}}>
                        Confirm
                    </button>
                </div>
            </div>
        )
    }

    // could be a separate module
    renderPricing() {
        if (this.props.room && this.state.dateRange) {
            return (
                <div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:"1rem"}}>
                        <div>£{this.props.room.nightlyPrice}  x   {this.state.dateRange} nights</div>
                        <div style={{fontSize:"1.5rem"}}>£{this.calculatePrice()}</div>    
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:"1rem"}}>
                        <div>Cleaning Fees</div>
                        <div style={{fontSize:"1.5rem"}}>£20</div>
                    </div>
                    <div className="ui divider"></div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:"1rem"}}>
                        <div>Total Price</div>
                        <div>£{this.calculatePrice() + this.state.cleaningFee}</div>
                    </div>
                </div>

            )
        }
        return (
            <div>Choose Dates to calculate price</div>
        )
        
    }

    renderPhotos() {
        return (
            <div className="ui segment" >
                <h2>Photos</h2>
                <div className="ui divider"></div>
                <img alt="" className="ui medium rounded image" src="https://via.placeholder.com/600/92c952"></img>
            </div>
        )
    }

    render() {
        return (
            <div className="ui container" >
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = ({ auth, rooms }, ownProps) => {
    return {
        auth,
        room: rooms[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, actions)(BookingCreate);