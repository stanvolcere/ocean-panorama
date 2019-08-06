// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import history from "../history";

class SignInModal extends React.Component {

    onDismiss() {
        if (this.props.auth) {
            history.push("/bookings");
        }
        history.push("/");
    }

    renderContent() {
        const { auth } = this.props;
        if (!auth) {
            return "You have to be signed in to perform that.";
        }
        return `You are currently signed in as: ${auth.name}`;
    }

    renderActions() {
        if (this.props.auth) {
            return (
                <a href="/api/logout">
                    <button class="ui secondary button">
                        Sign Out
                    </button>
                </a>
            )
        }
        return (
            <div className="signin_modal_actions">
                <a href="/auth/facebook">
                    <button className="ui facebook button">
                        <i className="facebook icon"></i>
                        Sign In with Facebook
                    </button>
                </a>
                <a href="/auth/google">
                    <button className="ui google plus button">
                        <i className="google plus icon"></i>
                        Sign In with Google
                </button>
                </a>
            </div>

        )
    }

    render() {
        // e.stopPropagation stops the event from bubbling up to en eventual event handler
        // which would cause the history.push() event to accidentaly get pushed
        return ReactDOM.createPortal(
            <div onClick={this.onDismiss} className="ui dimmer modals visible active">
                <div
                    onClick={e => e.stopPropagation()}
                    className="ui tiny modal visible active"
                >
                    <div className="header">Sign In or Create an Account.</div>
                    <div className="content">{this.renderContent()}</div>
                    <div className="actions">{this.renderActions()}</div>
                </div>
            </div>,
            // component to render this modal into
            document.querySelector("#modal")
        );
    };
}

const mapStateToProps = ({ auth }) => {
    return { auth }
};

export default connect(mapStateToProps)(SignInModal);