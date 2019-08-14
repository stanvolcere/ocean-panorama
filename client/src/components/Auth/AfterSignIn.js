import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from "../../actions";
import history from "../../history";

class AfterSignIn extends Component {

    componentDidUpdate() {
        this.performRedirect();
    }

    performRedirect() {
        let destinationUrl = localStorage.getItem("destinationUrl");

        if (!this.props.auth) {
            history.push('/');
        } else if (this.props.auth && destinationUrl) {
            if (destinationUrl.includes("booking")) {
                destinationUrl = "/bookings";
            }

            localStorage.removeItem("destinationUrl");
            history.push(destinationUrl);
        } else if (this.props.auth) {
            history.push('/bookings');
        }
    }

    render() {
        // have a spinning loading anaimation here
        return <div>
            One moment please
        </div>
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth }
};

export default connect(mapStateToProps, actions)(AfterSignIn);