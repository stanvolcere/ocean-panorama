const mongoose = require('mongoose');
const { Schema } = mongoose();

const bookingSchema = new Schema({
    status: String,
    _user: {
        type: Schema.Types.ObjectId,
        // ref here tells mongo to look for a collection named 
        // user to form the relationship , ie every survey belongs to a user
        ref: 'User'
    },
    _room: {
        type: Schema.Types.ObjectId,
        // ref here tells mongo to look for a collection named 
        // user to form the relationship , ie every survey belongs to a user
        ref: 'Room'
    },
    price: {
        type: Number,
        default: 0
    },
    bookingStartDate: Date,
    bookingEndDate: Date,
    createdOn: Date

});

mongoose.model('booking', bookingSchema);