const mongoose = require("mongoose");
const keys = require('../config/keys');
const { requireAuth } = require('../middleware/requireAuth');
//const stripe = require('stripe')(keys.stripeSecretKey);
const Booking = mongoose.model("booking");

module.exports = app => {

    // the amount here can be computed by us 
    app.post('/api/stripe', requireAuth, async (req, res) => {

        // the actual amount we want to charge is decided here
        console.log(req.body);
        // stripe.charges.create() returns a promise
        // const charge = await stripe.charges.create({
        //     amount: req.body.price,
        //     currency: 'usd',
        //     description: "Five dollars for 5 Credits",
        //     source: req.body.id,
        // });

        // //Todo: update the booking to indicate that the booking has been paid for
        // res.send(user);
    });
};