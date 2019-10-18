const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {

    app.post('/api/stripe', requireLogin, async (req, res) => {
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