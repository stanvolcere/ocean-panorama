const passport = require("passport");
const mongoose = require('mongoose');
const generateToken = require('../services/generateToken');
const { requireAuthAdmin } = require("../middleware/requireAuth");

const Admin = mongoose.model('admin');

const requireSignIn = passport.authenticate('local', { failureRedirect: "/admin/login", session: false });
//const requireAuth = passport.authenticate('auth_admin_token', { session: false });


module.exports = app => {

    // using passport local for login in an admin
    // if the username + password combo is valid we return the user a token to be used for 
    // subsequent authenticated requests
    app.post('/api/admin/login', requireSignIn, (req, res) => {
        console.log(req.user);
        res.send({ token: generateToken(req.user) });
    });

    // Sign Up a new Admin
    app.post('/api/admin', async (req, res) => {
        //console.log(req.body)
        const admin = new Admin(req.body);

        try {
            await admin.save();
            res.status(201).send(admin);
        } catch (e) {
            res.send(e);
        }
    });

    // app.get("/admin/home", requireAuth, (req, res) => {
    //     // you have a ccess to req.user because passport will set it for us after passing through
    //     // the requireAuth middleware
    //     res.send({ message: "from /admin/home" });
    // });

    // remember to re add the require Auth middleware
    app.get("/api/admin", requireAuthAdmin, (req, res) => {
        console.log(req.user);
        res.send({ message: "Hi, from the dashbaord!" });
    });
};
