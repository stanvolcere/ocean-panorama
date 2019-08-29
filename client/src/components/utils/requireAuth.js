import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import history from "../../history";

export default ChildComponent => {
  class ComposedComponent extends Component {


    // Our component just got rendered
    componentDidMount() {
      this.fetchUser();
      this.setDestinationUrl();
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    fetchUser() {
      if (this.props.authToken) {
        this.props.fetchUser();
      }
    }

    setDestinationUrl() {
      const destinationUrl = localStorage.getItem("destinationUrl");
      const { auth } = this.props;

      if (!destinationUrl && !auth) {
        localStorage.setItem("destinationUrl", this.props.match.url);
      }
    }

    shouldNavigateAway() {
      if (!this.props.authToken) {
        history.push('/signin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ authToken, auth }) => {
    return { authToken, auth };
  };

  return connect(mapStateToProps, { fetchUser })(ComposedComponent);
};