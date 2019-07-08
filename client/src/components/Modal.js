// this should be for delete confirmation only
import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  // e.stopPropagation stops the event from bubbling up to en eventual event handler
  // which would cause the history.push() event to accidentaly get pushed
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    // component to render this modal into
    document.querySelector("#modal")
  );
};

export default Modal;
