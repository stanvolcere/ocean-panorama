import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoomList from './Rooms/RoomList';


class Dashboard extends Component{

    renderContentWhenNotAuthenticated() {
        return (
            <React.Fragment>
                Our Rooms
                <div className="ui three column grid" style={{display:"flex", justifyContent:"center"}}>
                    <RoomList />
                </div>
            </React.Fragment>
        )
    }

    renderContentWhenAuthenticated() {
        return (
            <React.Fragment>
                Upcoming Bookings
                <div className="ui three column grid" style={{display:"flex", justifyContent:"center"}}>
                    
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderContentWhenNotAuthenticated()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Dashboard);