// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import history from "../../history";
import requireAuth from "../utils/requireAuth";

class SendEnquiryModal extends React.Component {

    onDismiss = () => {
        const { room } = this.props;
        if (room) {
            history.push(`/rooms/${room._id}`);
        }
        history.push("/");
    }

    renderContent() {
        return <div>
            <p>from {this.props.auth.name}</p>
            some stuff you wanna ask
        </div>
    }

    renderActions() {
        return <div>
            buttons to send or dismiss
        </div>
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
                    <div className="header">Send An Enquiry.</div>
                    <div className="content">{this.renderContent()}</div>
                    <div className="actions">{this.renderActions()}</div>
                </div>
            </div>,
            // component to render this modal into
            document.querySelector("#modal")
        );
    };
}

export default requireAuth(SendEnquiryModal);
