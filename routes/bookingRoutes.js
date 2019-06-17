const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Booking = mongoose.model('booking');

module.exports = (app) => {
    // get all bookings for a guest
    app.get('/api/bookings', requireLogin, async (req, res) => {
        //res.send('list of bookings');
        const bookings = await Booking.find({ _user: req.user });

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
        // es6 destructuring
        // const {  } = req.body;
        const booking = new Booking({
            ...req.body,
            _user: req.user
        });
        
        try {
            await booking.save();
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

