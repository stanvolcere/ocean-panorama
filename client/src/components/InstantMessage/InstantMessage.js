import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../utils/requireAuth";

class InstantMessage extends Component {

    renderMessageBox() {
        return <div className="field">
            <textarea></textarea>
        </div>
    }

    renderMessageDisplay() {
        return <div>message display</div>
    }

    render() {
        //return this.renderHolder();
        return (
            <div>
                <div className="content__heading">Message Host</div>
                <div className="instant__message__container">
                    <div className="instant__message__box">
                        {this.renderMessageBox()}
                    </div>
                    <div className="instant__message__box">
                        {this.renderMessageDisplay()}
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps, null)(requireAuth(InstantMessage));