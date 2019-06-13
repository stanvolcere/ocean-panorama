import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class BookingCreate extends Component{

    componentDidMount() {
        //this.props.fetchRoom(this.props.match.params.id);
        console.log(this.props);
    }

    renderContent() {
        const { room } = this.props;
        return (
            <div className="ui segment" >
                Make booking
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