import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions';
import RoomList from './RoomList';
import RoomDetail from './RoomDetail';

class RoomView extends Component{

    componentDidMount() {
        this.props.fetchRooms();
    }

    renderContent() {
       return (
           <div className="ui segment" style={{position:"fixed", width:"55%", height:"85%"}}>
                <RoomDetail room={this.props.room} id={this.props.roomID}/>
            </div>
       )
    }

    renderLeftContent() {
        return <RoomList />
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="six wide column">
                        {this.renderLeftContent()}
                    </div>
                
                    <div className="eight wide column">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ rooms }, ownprops) {
    return { 
        rooms, 
        room: rooms[parseInt(ownprops.match.params.id)],
        roomID: ownprops.match.params.id
     };
}

export default connect(mapStateToProps, { fetchRooms })(RoomView);