const mongoose = require('mongoose');

const Booking = mongoose.model('Bookings');

module.exports = (app) => {
    // get all bookings for a guest
    app.get('/api/bookings', requireLogin, async (req, res) => {
        res.send('list of bookings');
    });

    // specific booking for guest
    app.get('/api/bookings/:id', requireLogin , async (req, res) => {
        res.send('return specific booking');
    });

    // create new booking
    app.post('/api/bookings', requireLogin, async (req, res) => {
        res.send('create a booking');
    });

    app.patch('/api/bookings', requireLogin, async (req, res) => {
        
    })
}