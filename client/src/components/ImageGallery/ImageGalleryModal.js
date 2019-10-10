// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";
import { Link } from "react-router-dom";
const queryString = require('query-string');

class ImageGalleryModal extends React.Component {

    state = { returnUrl: "" };

    componentDidMount() {
        this.props.fetchRooms();
        this.setReturnUrl();
    }

    // sets the return URL on our local state 
    setReturnUrl() {
        const query = queryString.parse(this.props.location.search);
        this.setState({ returnUrl: query.returnUrl });
    }

    dismissAction = () => {
        this.props.history.push(this.state.returnUrl);
    }

    renderPhotos(imageUrls) {
        return <div className="image__gallery__content">
            <div className="image__gallery__change__image"><Link to="#"><i className="arrow circle left icon"></i></Link></div>
            <img className="ui huge image" alt="image__gallery" src={imageUrls}></img>
            <div className="image__gallery__change__image"><Link to="#"><i className="arrow circle right icon"></i></Link></div>
        </div>
    }

    render() {
        // e.stopPropagation stops the event from bubbling up to en eventual event handler
        // which would cause the history.push() event to accidentaly get pushed
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active">
                <div onClick={e => e.stopPropagation()} className="ui fullscreen basic modal visible active image__gallery__container">
                    <div onClick={this.dismissAction} className="image__gallery__close__button"><i className="close icon"></i></div>
                    {this.renderPhotos(this.props.imageUrls)}
                </div>
            </div >,
            document.querySelector("#modal")

        );
    }
};

const mapStateToProps = ({ rooms }, ownProps) => {
    const room = rooms.find(room => room._id === ownProps.match.params.id) || rooms[0];

    if (room) {
        return {
            imageUrls: room.imageUrls
        }
    }
    return {};
}

export default connect(mapStateToProps, { fetchRooms })(ImageGalleryModal);
