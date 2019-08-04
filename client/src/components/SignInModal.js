// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import history from "../history";

class SignInModal extends React.Component {

    onDismiss() {
        history.push("/");
    }

    renderActions() {
        return (
            <div className="signin_modal_actions">
                <a href="/auth/facebook">
                    <button class="ui facebook button">
                        <i class="facebook icon"></i>
                        Sign In with Facebook
                    </button>
                </a>
                <a href="/auth/google">
                    <button class="ui google plus button">
                        <i class="google plus icon"></i>
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
                    className="ui standard modal visible active"
                >
                    <div className="header">Sign In or Create an Account.</div>
                    <div className="content">You have to be signed in to perform that.</div>
                    <div className="actions">{this.renderActions()}</div>
                </div>
            </div>,
            // component to render this modal into
            document.querySelector("#modal")
        );
    };
}

export default SignInModal;
