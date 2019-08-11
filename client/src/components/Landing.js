import React, { Component } from "react";
import { connect } from 'react-redux';
import RoomList from './Rooms/RoomList';

class Landing extends Component {

  render() {
    return (
      <div>
        <div className="landing-hero" />
        <div className="text-box">
          <div className="landing__page__heading-primary">
            <div className="heading-primary-main">
              Ocean Panorama
            </div>
            <div className="heading-primary-sub">
              Sunny Holidays in the Seychelles
            </div>
          </div>
        </div>
        <div id="rooms" className="section__landing">
          <div className="section__main__header">Some of Our Rooms</div>
          <div className="section__main__sub">Our rooms range from Private Rooms to Entire Floor.</div>
          <hr></hr>
          <div className="section__rooms__show__room">
            <RoomList />
          </div>
        </div>
        <div id="testimonials" className="section__landing">
          <div className="section__main__header">Some Testimonials from our Adventurers</div>
          <hr></hr>
          <div className="testimonial__header">Stan Volcere</div>

          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.</div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ rooms }) => {
  return { rooms };
}

export default connect(mapStateToProps)(Landing);
