import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../../actions';

// remember the amount is denoted in cents -> 5 dollars is 500 cents
class Payments extends Component {

    onToken = (bookingId) => token => {
        this.props.handleToken({ token, bookingId });
    }

    render() {
        const { bookingId, price } = this.props;
        const bookingDisplayAmount = price * 100;

        return (
            <StripeCheckout
                name='Ocean Panorama'
                label='Pay Now'
                description={`Total price is £${price}`}
                billingAddress
                // note the amoinut is in cents and thus must be converted to hundreds
                amount={bookingDisplayAmount}
                currency="GBP"
                token={this.onToken(bookingId, price)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="ui blue button">Pay Now</button>
            </StripeCheckout>
        )
    };
}

export default connect(null, { handleToken })(Payments);