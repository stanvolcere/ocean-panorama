import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from "../../history";

export default ChildComponent => {
  class ComposedComponent extends Component {

    // Our component just got rendered
    componentDidMount() {
      this.setDestinationUrl();
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    setDestinationUrl() {
      const destinationUrl = localStorage.getItem("destinationUrl");
      const { auth } = this.props;

      if (!destinationUrl && !auth) {
        localStorage.setItem("destinationUrl", this.props.match.url);
      }
    }

    // shouldNavigateAway() {
    //   if (!this.props.auth) {
    //     return history.push('/signin');
    //   }
    // }

    // getAuthToken() {
    //   return localStorage.getItem('token');
    // }

    shouldNavigateAway() {
      //const authToken = this.getAuthToken();

      if (!this.props.authToken) {
        return history.push('/signin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ authToken }) => {
    return { authToken };
  };

  return connect(mapStateToProps)(ComposedComponent);
};