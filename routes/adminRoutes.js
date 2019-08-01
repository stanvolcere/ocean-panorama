const passport = require("passport");
const mongoose = require('mongoose');
const generateToken = require('../services/generateToken');

const Admin = mongoose.model('admin');

const requireSignIn = passport.authenticate('local', { failureRedirect: "/admin/login", session: false });
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = app => {

    // using passport local for login in an admin
    // if the username + password combo is valid we return the user a token to be used for 
    // subsequent authenticated requests
    app.post('/admin/login', requireSignIn, (req, res) => {
        res.send({ token: generateToken(req.user) });
    });

    // Sign Up a new Admin
    app.post('/admin', async (req, res) => {
        const admin = new Admin(req.body);

        try {
            await admin.save();
            res.status(201).send(admin);
        } catch (e) {
            res.send(e);
        }
    });

    app.get("/admin/home", requireAuth, (req, res) => {
        // you have a ccess to req.user because passport will set it for us after passing through
        // the requireAuth middleware
        res.send({ message: "from /admin/home" });
    });

    app.get("/admin/home/hi", requireAuth, (req, res) => {
        res.send({ message: "Hi from the admin page + hi" });
    });
};
