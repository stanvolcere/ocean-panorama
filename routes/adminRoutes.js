const passport = require("passport");


module.exports = app => {
    app.get("/admin/home", (req, res) => {
        res.send("Hi from the admin page");
    });

    app.get("/admin/home/hi", (req, res) => {
        res.send("Hi from the admin page + hi");
    });
};
