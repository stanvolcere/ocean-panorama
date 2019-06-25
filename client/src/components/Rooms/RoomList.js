import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRooms } from '../../actions';
import BookRoomButton from './BookRoomButton';

class RoomList extends Component{

    componentDidMount() {
        this.props.fetchRooms();
    }

    renderContent() {
        const { rooms } = this.props;
        var counter = -1;
        return rooms.map((room) => {
            counter++;
            return (
                <div key={room._id} className="column" style={{display:"flex", alignItems:"center", marginBottom:"1.4rem"}}>
                    <div className="ui segment">
                        <Link to={`/rooms/${counter}`}>
                            <div className="ui card">

                                <div className="image">
                                    <img alt="" src="https://via.placeholder.com/150/56a8c2"/>
                                </div>
                                
                                <div className="content">
                                    <a className="header">{room.title}</a>
                                    <div className="description">
                                        {room.description}
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                        
                        <BookRoomButton id={counter} />
                    </div>
                </div>
            )
            
        });        
    }

    render() {
        return (
            <div className="ui container">
                {this.renderContent()} 
            </div>
        );
    }
}

function mapStateToProps({ rooms }) {
    return { rooms };
}

export default connect(mapStateToProps, {fetchRooms})(RoomList);