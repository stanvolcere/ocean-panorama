const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    status: String,
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref here tells mongo to look for a collection named 
        // user to form the relationship , ie every survey belongs to a user
        ref: 'user'
    },
    _room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref here tells mongo to look for a collection named 
        // user to form the relationship , ie every survey belongs to a user
        ref: 'room'
    },
    price: {
        type: Number,
        default: 0
    },
    numberOfGuests: {
        type: Number,
        default: 1
    },
    bookingStartDate: Date,
    bookingEndDate: Date,
    createdOn: Date
});

mongoose.model('booking', bookingSchema);