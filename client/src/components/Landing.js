import React, { Component } from "react";

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
        <div className="landing-hero" />
      </div>
    );
  }
}

export default Landing;
