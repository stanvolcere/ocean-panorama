const mongoose = require('mongoose');
const { Schema } = mongoose;

const testimonialSchema = new Schema({
    author: String,
    description: String
});

mongoose.model('testimonial', testimonialSchema);