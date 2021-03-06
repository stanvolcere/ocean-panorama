import React, { Component } from "react";
import { connect } from "react-redux";
import BookRoomButton from "./BookRoomButton";

class RoomDetail extends Component {
  renderContent() {
    if (this.props.room) {
      const { title, description, nightlyPrice, imageUrls } = this.props.room;

      return (
        <div>
          <div className="content__heading">{title}</div>
          <div className="ui divider" />
          <div>{description}</div>
          <div className="ui divider" />
          {this.renderImages(imageUrls)}
          <div className="ui divider" />
          {this.renderPrice(nightlyPrice)}
        </div>
      );
    }
    return (
      <div className="ui active dimmer">
        <div className="ui loader" />
      </div>
    );
  }

  renderImages(imageUrls) {
    return (
      <div>
        <img alt="image of the rooms" className="room__details__image" src={imageUrls[0]} />
      </div>
    );
  }

  renderButton() {
    if (this.props.room) {
      return (
        <div>
          <div className="ui divider" />
          <BookRoomButton id={this.props.room._id} />
        </div>
      );
    }
  }

  renderPrice(nightlyPrice) {
    return (
      <div className="ui horizontal statistic">
        <div className="value">£{nightlyPrice}</div>
        <div className="label">/night</div>
      </div>
    );
  }

  render() {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%"
        }}
      >
        {this.renderContent()}
        {this.renderButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ rooms }, ownProps) => {
  return {
    room: rooms.find(room => room._id === ownProps.id)
  };
};

export default connect(mapStateToProps)(RoomDetail);
