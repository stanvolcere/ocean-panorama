import React, { Component } from "react";
import { connect } from 'react-redux';
import { signOut, fetchUser } from "../../actions";
import history from "../../history";
import requireAuth from '../utils/requireAuth';

class SignOut extends Component {
    componentDidMount() {
        this.props.signOut();
        this.performRedirect();
    }

    componentDidUpdate() {
        this.props.fetchUser();
    }

    performRedirect() {
        history.push("/");
    }

    render() {
        return <div></div>
    }
}

export default connect(null, { signOut, fetchUser })(requireAuth(SignOut));