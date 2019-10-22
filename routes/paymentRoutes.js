const mongoose = require("mongoose");
const keys = require('../config/keys');
const { requireAuth } = require('../middleware/requireAuth');
const stripe = require('stripe')(keys.stripeSecretKey);
const Booking = mongoose.model("booking");

module.exports = app => {

    const convertToCents = (amount) => {
        return amount * 100;
    };

    // the amount here can be computed by us 
    app.post('/api/stripe', requireAuth, async (req, res) => {
        // the actual amount we want to charge is decided here
        const { bookingId, token } = req.body;


        try {
            const booking = await Booking.findById(bookingId)
                .populate("_room")
                .exec();

            const charge = await stripe.charges.create({
                amount: convertToCents(booking.price),
                currency: 'gbp',
                description: `OP Payment for BookingId: ${booking._id}`,
                source: token.id,
            });

            booking.status = "Confirmed";
            booking.paid = true;

            const updatedBooking = await booking.save();

            res.send([updatedBooking]);

        } catch (e) {
            console.log(e);
            res.send("We encountered an error while completing your transaction", e);
        }
    });
};