const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Booking = mongoose.model('booking');

module.exports = (app) => {
    // get all bookings for a guest
    app.get('/api/bookings', requireLogin, async (req, res) => {
        //res.send('list of bookings');
        const bookings = await Booking.find({ _user: req.user });

        if (!bookings) {
            return res.status(404).send("Sorry no bookings were found");
        }

        return res.status(200).send(bookings);
    });

    // specific booking for guest
    app.get('/api/bookings/:id', requireLogin , async (req, res) => {
        res.send('return specific booking');
    });

    // create new booking
    app.post('/api/bookings', requireLogin, async (req, res) => {
        res.send('create a booking');
        // es6 destructuring
        //const { title, body, subject, recipients } = req.body;
        //const { status } = 

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

