const mongoose = require('mongoose');
// usage of destructuring 
const { Schema } = mongoose;

const roomSchema = new Schema({
    title: String,
    description: String,
    beds: {
        type: Number,
        default: 0
    },
    bedrooms: {
        type: Number,
        default: 0
    },
    baths: {
        type: Number,
        default: 0
    },
    enlisted: {
        type: Boolean,
        default: true
    },
    nightlyPrice: {
        type: Number,
        default: 0
    },
    cleaningFee: Number,
    maxGuests: {
        type: Number,
        default: 1
    }
});

mongoose.model('room', roomSchema);