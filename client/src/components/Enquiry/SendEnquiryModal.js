// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import history from "../../history";
import requireAuth from "../utils/requireAuth";
import EnquiryForm from './EnquiryForm';
import { fetchRoom, sendEnquiry } from '../../actions';

class SendEnquiryModal extends React.Component {

    componentDidMount() {
        this.props.fetchRoom(this.props.match.params.id);
    }

    onDismiss = () => {
        const { room } = this.props;
        if (room) {
            return history.push(`/rooms/${room._id}`);
        }
        history.push(`/rooms/0`);
    }

    renderContent() {
        return <div><EnquiryForm onSubmit={this.props.sendEnquiry} auth={this.props.auth} room={this.props.room} /></div>
    }

    renderActions() {
        return;
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
                </div>
            </div>,
            // component to render this modal into
            document.querySelector("#modal")
        );
    };
}

const mapStateToProps = ({ auth, rooms }) => {
    return {
        auth,
        room: rooms[0]
    }
}

export default connect(mapStateToProps, { fetchRoom, sendEnquiry })(requireAuth(SendEnquiryModal));
