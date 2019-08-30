import React from "react";
import { connect } from 'react-redux';
import { clearFlashMessage } from '../actions';

class FlashMessage extends React.Component {

    renderContent() {
        if (this.props.authToken && this.props.flashMessage) {
            return (
                <div class="ui info message">
                    <i class="close icon" onClick={this.props.clearFlashMessage}></i>
                    <div class="header">
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