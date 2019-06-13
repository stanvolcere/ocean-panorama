const mongoose = require('mongoose');
const Room = mongoose.model('room');

module.exports = (app) => {
    // get all available rooms 
    app.get('/api/rooms', async (req, res) => {
        const rooms = await Room.find({ enlisted: true });
        res.status(200).send(rooms);
    });

    // get a specific room
    app.get('/api/rooms/:id', async (req, res) => {
        const _id = req.params.id;

        const room = await Room.findOne({ _id, enlisted: true });
        res.status(200).send(room);
    });
}