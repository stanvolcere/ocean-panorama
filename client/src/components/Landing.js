import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import Dashboard from './Dashboard';

class Landing extends Component{
    render() {
        return (
            <div className="ui container">
                <div className="ui placeholder raised segment" style={{alignItems:"center", fontSize:"3.5rem", letterSpacing: "0.3em"}}>
                    Ocean Panorama Hotel
                </div>
                
                <Dashboard />
            </div>
        )
    }
}

export default Landing;