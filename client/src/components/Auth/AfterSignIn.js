import React, { Component } from "react";
import { connect } from 'react-redux';
import history from "../../history";
import requireAuth from "../utils/requireAuth";

class AfterSignIn extends Component {

    render() {
        // have a spinning loading anaimation here
        return <div>
            One moment please
        </div>
    }
}

export default requireAuth(AfterSignIn);