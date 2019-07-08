const mongoose = require("mongoose");
const moment = require("moment");
const requireLogin = require("../middleware/requireLogin");
const { sendBookingConfirmationEmail } = require("../emails/account");

const Booking = mongoose.model("booking");

module.exports = app => {
  // get all bookings for a guest
  app.get("/api/bookings", requireLogin, async (req, res) => {
    //res.send('list of bookings');
    const bookings = await Booking.find({ _user: req.user })
      .populate("_room")
      .exec();

    if (!bookings) {
      return res.status(404).send();
    }

    return res.status(200).send(bookings);
  });

  app.get("/api/bookings/blocked/:id", requireLogin, async (req, res) => {
    // res.send("from blocked route");
    const bookingsForSpecifiedRoom = await Booking.find({
      _room: req.params.id,
      bookingEndDate: {
        $gte: moment().toDate()
      }
    }).select("bookingStartDate bookingEndDate");

    // sent in reversed order here in order to simplfiy the searching of blocked dates
    res.send(bookingsForSpecifiedRoom.reverse());
  });

  // specific booking for guest
  app.get("/api/bookings/:id", requireLogin, async (req, res) => {
    // return a specific booking
    const id = req.params.id;
    const booking = await Booking.findById(id).populate("_room");

    if (booking) {
      return res.send(booking);
    }

    return res.status(404).send();
  });

  // create new booking
  app.post("/api/bookings", requireLogin, async (req, res) => {
    const booking = new Booking({
      ...req.body,
      _user: req.user
    });

    //get room name
    const room = await mongoose
      .model("room")
      .findOne({ _id: req.body._room })
      .select("title");

    const bookingDetails = {
      guestName: req.user.name,
      guestEmail: req.user.email,
      bookingTotalPrice: req.body.price,
      bookingStartDate: req.body.bookingStartDate,
      bookingEndDate: req.body.bookingEndDate,
      roomTitle: room.title
    };
    //console.log(bookingDetails);

    try {
      await booking.save();
      sendBookingConfirmationEmail(bookingDetails);
      return res.status(200).send();
    } catch (e) {
      return res.send(e);
    }
  });

  // update a booking
  app.patch("/api/bookings/:id", requireLogin, async (req, res) => {
    res.send("edit a booking");
  });

  // update a booking
  app.delete("/api/bookings/:id", requireLogin, async (req, res) => {
    try {
      const booking = await Booking.findOneAndDelete({
        _id: req.params.id,
        _user: req.user._id
      });

      if (!booking) {
        return res.status(404).send();
      }
      res.send(booking);
    } catch (e) {
      res.status(500).send(e);
    }
  });
};
