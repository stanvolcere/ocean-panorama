const mongoose = require('mongoose');

require('../models/Booking');
require('../models/Room');

const Booking = mongoose.model('booking');
const Room = mongoose.model('room');

// const addBooking = async () => {
//     const booking = await new Booking({
//         status: 'Confirmed',

//     });
// }

const addRoom = async () => {
    const room = await new Room({
        title: "Apt 1",
        description: 'Nice Apt'
    });

    await room.save();
}

addRoom();