import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from "../../actions";
import history from "../../history";

class TestingWithTokens extends Component {

    render() {
        return <div>
            <button onClick={}></button>
        </div>
    }

}

export default connect(null, { facebookSignin })(TestingWithToken);