// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";

class ImageGalleryModal extends React.Component {

    componentDidMount() {
        this.props.fetchRooms();
    }

    renderPhotos(imageUrls) {
        return <React.Fragment>
            <img className="ui huge image image__gallery__image" alt="image__gallery" src={imageUrls}></img>
        </React.Fragment>
    }

    render() {
        // e.stopPropagation stops the event from bubbling up to en eventual event handler
        // which would cause the history.push() event to accidentaly get pushed
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active">
                <div onClick={e => e.stopPropagation()} className="ui fullscreen basic modal visible active image__gallery__content">
                    <div onClick={() => { this.props.history.goBack() }} className="image__gallery__close__button"><i className="close icon"></i></div>
                    <div className="content">
                        {this.renderPhotos(this.props.imageUrls)}
                    </div>
                </div>
            </div>,
            // component to render this modal into
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
