import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actions from "../../actions";
import requireAuth from "../utils/requireAuth";

class Profile extends Component {

    renderContent() {
        if (this.props.auth) {
            return <React.Fragment>
                {this.props.auth.name}
            </React.Fragment>
        }
        return <React.Fragment>Profile loading...</React.Fragment>
    }

    render() {
        return (
            <div className="ui container">
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

// compose from redux lib allows us to have multiple HOCs to our React Componenet
// export default connect(mapStateToProps, actions)(requireAuth(BookingList));
export default connect(mapStateToProps, {})(requireAuth(Profile));
