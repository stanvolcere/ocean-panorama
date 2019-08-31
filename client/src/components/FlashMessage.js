import React from "react";
import { connect } from 'react-redux';
import { clearFlashMessage } from '../actions';

class FlashMessage extends React.Component {

    renderContent() {
        if (this.props.authToken && this.props.flashMessage) {
            return (
                <div className="ui info message">
                    <i className="close icon" onClick={this.props.clearFlashMessage}></i>
                    <div className="header">
                        {this.props.flashMessage}
                    </div>
                </div>
            )
        }
        return <div></div>
    }

    render() {
        return this.renderContent()
    }
}

const mapStateToProps = ({ authToken, flashMessage }) => {
    return {
        authToken,
        flashMessage
    }
}

export default connect(mapStateToProps, { clearFlashMessage })(FlashMessage);