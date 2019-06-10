const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    facebookID: String,
    name: String,
    email: String
});

// creates the collection in mongoDB under the name user
mongoose.model( 'user', userSchema );