import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// remember the amount is denoted in cents -> 5 dollars is 500 cents
class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name='Ocean Panorama'
                description="Payment for Booking"
                amount={this.props.price}
                //token={token => this.props.handleToken(token)}
                token={() => console.log("hi")}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}

            >
                <button className="ui blue button">Pay Now</button>
            </StripeCheckout>
        )
    };
}

export default connect(null, actions)(Payments);