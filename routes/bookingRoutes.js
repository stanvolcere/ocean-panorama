const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const { sendBookingConfirmationEmail } = require("../emails/account");

const Booking = mongoose.model('booking');

module.exports = (app) => {
    // get all bookings for a guest
    app.get('/api/bookings', requireLogin, async (req, res) => {
        //res.send('list of bookings');
        const bookings = await Booking.find({ _user: req.user }).populate('_room').exec();

        if (!bookings) {
            return res.status(404).send();
        }

        return res.status(200).send(bookings);
    });

    // specific booking for guest
    app.get('/api/bookings/:id', requireLogin , async (req, res) => {
        res.send('return specific booking');
    });

    // create new booking     
    app.post('/api/bookings', requireLogin, async (req, res) => {
        
        const booking = new Booking({
            ...req.body,
            _user: req.user
        });

        //get room name
        const room = await mongoose.model('room').findOne({ _id: req.body._room }).select('title');


        const bookingDetails = {
            guestName: req.user.name,
            guestEmail: req.user.email,
            bookingTotalPrice: req.body.price,
            bookingStartDate: req.body.bookingStartDate,
            bookingEndDate: req.body.bookingEndDate,
            roomTitle: room.title,
        }
        //console.log(bookingDetails);

        try {
            await booking.save();
            sendBookingConfirmationEmail(bookingDetails);
            return res.status(200).send();
        } catch(e) {
            return res.send(e);
        }
    
    });

    // update a booking
    app.patch('/api/bookings', requireLogin, async (req, res) => {
        res.send('edit a booking');
    });

    // update a booking
    app.delete('/api/bookings', requireLogin, async (req, res) => {
        res.send('delete a booking');
    });
}

