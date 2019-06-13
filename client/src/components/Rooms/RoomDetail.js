import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookRoomButton from './BookRoomButton';

class RoomDetail extends Component{

    constructor(props) {
        super(props);
    }

    renderContent() {
        if (this.props.room) {
            const { title, description, nightlyPrice } = this.props.room;
            
            return (
                <div>
                    <h1>{title}</h1>
                    <div class="ui divider"></div>
                    <p>{description}</p>
                    <div class="ui divider"></div>
                    {this.renderImages()}
                    <div class="ui divider"></div>
                    {this.renderPrice(nightlyPrice)}
                </div>
            )
        }
        return (
            <div className="ui active dimmer">
                <div className="ui loader"></div>
            </div>
        )
    }

    renderImages() {
        return ( 
            <div>
                <img class="ui medium centered image" src={`https://via.placeholder.com/600/1fe46f`}></img>
            </div>
            
        )
    }

    renderButton() {
        return (
            <div>
                <div class="ui divider"></div>
                <BookRoomButton id={this.props.id} />
            </div>
        )
    }

    renderPrice(nightlyPrice) {
        return (
            <div className="ui horizontal statistic">
                <div className="value">
                    £{nightlyPrice}
                </div>
                <div className="label">
                    /night
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="ui container" style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
                {this.renderContent()}
                {this.renderButton()}
            </div>
        );
    }
}

export default RoomDetail;