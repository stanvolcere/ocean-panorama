const passport = require("passport");
const mongoose = require('mongoose');
const requireAdminAuth = require('../middleware/requireAuth');

const Admin = mongoose.model('admin');

module.exports = app => {
    app.get('/testimonials', (req, res) => {
        res.send("List of testimonials");
    });

    app.post('/testimonials', requireAdminAuth, (req, res) => {
        res.send("create a testimonial testimonials");
    });

    app.delete('/testimonials/:id', requireAdminAuth, (req, res) => {
        res.send("delete testimonial");
    });

    app.patch('/testimonials/:id', requireAdminAuth, (req, res) => {
        res.send("update a testimonial");
    });
};
