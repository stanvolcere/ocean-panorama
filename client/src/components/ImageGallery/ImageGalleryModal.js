// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";
const queryString = require('query-string');

class ImageGalleryModal extends React.Component {

    state = {
        returnUrl: "",
        currentImageUrlId: 0
    };

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
        if (this.state.returnUrl && this.state.returnUrl.length > 0) {
            return this.props.history.push(this.state.returnUrl);
        }
        return this.props.history.push("/rooms/0");
    }

    renderPhotos(imageUrls) {
        if (imageUrls) {
            return <div className="image__gallery__content">
                <div className="image__gallery__change__image" onClick={() => this.onLeftArrowClick(imageUrls.length)}><i className="arrow circle left icon"></i></div>
                <img className="ui huge image" alt="image__gallery" src={imageUrls[this.state.currentImageUrlId]}></img>
                <div className="image__gallery__change__image" onClick={() => this.onRightArrowClick(imageUrls.length)}><i className="arrow circle right icon"></i></div>
            </div >
        }
        return <div></div>
    }

    onRightArrowClick(imageUrlsSize) {
        let currentId = this.state.currentImageUrlId;
        currentId++;

        if (currentId >= imageUrlsSize) {
            this.setState({ currentImageUrlId: 0 });
        } else {
            this.setState({ currentImageUrlId: this.state.currentImageUrlId + 1 });
        }
    }

    onLeftArrowClick(imageUrlsSize) {
        let currentId = this.state.currentImageUrlId;
        currentId--;

        if (currentId < 0) {
            this.setState({ currentImageUrlId: imageUrlsSize - 1 });
        } else {
            this.setState({ currentImageUrlId: this.state.currentImageUrlId - 1 });
        }
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
