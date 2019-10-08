// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";

const ImageGalleryModal = props => {
    // e.stopPropagation stops the event from bubbling up to en eventual event handler
    // which would cause the history.push() event to accidentaly get pushed
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div onClick={e => e.stopPropagation()} className="ui fullscreen basic modal visible active">
                <div onClick={() => { console.log("exited") }} className="image__gallery__close__button"><i className="close icon"></i></div>
                <div className="content">Content here</div>
            </div>
        </div>,
        // component to render this modal into
        document.querySelector("#modal")
    );
};

export default ImageGalleryModal;
