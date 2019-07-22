import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRooms } from "../../actions";
import BookRoomButton from "./BookRoomButton";

class RoomList extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  renderContent() {
    if (this.props.rooms) {
      const { rooms } = this.props;

      return rooms.map(room => {
        return (
          <div
            key={room._id}
            className="column"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.4rem"
            }}
          >
            <div className="ui segment">
              <Link to={`/rooms/${room._id}`}>
                <div className="ui card">
                  <div className="image">
                    <img alt="" src={room.imageUrls[0]} />
                  </div>

                  <div className="content">
                    <h3 to="#" className="header">
                      {room.title}
                    </h3>
                    <div className="description">{room.description}</div>
                  </div>
                </div>
              </Link>

              <BookRoomButton id={room._id} />
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return <div className="ui container">{this.renderContent()}</div>;
  }
}

function mapStateToProps({ rooms }) {
  return { rooms };
}

export default connect(
  mapStateToProps,
  { fetchRooms }
)(RoomList);
