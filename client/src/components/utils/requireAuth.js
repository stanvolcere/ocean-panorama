import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import history from "../../history";

export default ChildComponent => {
  class ComposedComponent extends Component {

    // Our component just got rendered
    componentDidMount() {
      console.log(this.props);
      this.props.fetchUser();
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

    shouldNavigateAway() {
      if (!this.props.auth) {
        history.push('/signin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => {
    return { auth };
  }

  return connect(mapStateToProps, actions)(ComposedComponent);
};