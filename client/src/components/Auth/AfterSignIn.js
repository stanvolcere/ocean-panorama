import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchUser, saveToken } from "../../actions";
import history from "../../history";

class AfterSignIn extends Component {

    componentDidMount() {
        this.props.saveToken();
    }

    componentDidUpdate() {
        this.performRedirect();
    }

    performRedirect() {
        const { authToken } = this.props;

        if (authToken) {
            history.push('/bookings');
        } else {
            history.push('/');
        }
        // let destinationUrl = localStorage.getItem("destinationUrl");
        // const { authToken } = this.props;

        // if (!authToken) {
        //     history.push('/');
        // } else if (authToken && destinationUrl) {
        //     if (destinationUrl.includes("booking")) {
        //         destinationUrl = "/bookings";
        //     }

        //     localStorage.removeItem("destinationUrl");
        //     history.push(destinationUrl);
        // } else if (authToken) {
        //     history.push('/bookings');
        // }
    }

    render() {
        // have a spinning loading anaimation here
        return <div>
            One moment please
        </div>
    }
}

const mapStateToProps = ({ auth, authToken }) => {
    return { auth, authToken }
};

export default connect(mapStateToProps, { fetchUser, saveToken })(AfterSignIn);