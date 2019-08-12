import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {

    // Our component just got rendered
    componentDidMount() {
      console.log(this.props);
      // console.log(localStorage.getItem('destination'));
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
      console.log(this.props);
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/signin');
      }
      localStorage.setItem("destination", "yessir");
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth };
  }
  return connect(mapStateToProps)(ComposedComponent);
};