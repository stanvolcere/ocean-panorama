const mongoose = require('mongoose');
const Room = mongoose.model('room');
const Booking = mongoose.model('booking');
const { requireAuthAdmin, requireAuth } = require("../middleware/requireAuth");

module.exports = (app) => {
    // get all available rooms 
    app.get('/api/rooms', async (req, res) => {
        const rooms = await Room.find({ enlisted: true });
        res.status(200).send(rooms);
    });

    // get a specific room
    app.get('/api/rooms/:id', async (req, res) => {
        const _id = req.params.id;

        const room = await Room.findOne({ _id, enlisted: true });

        // return all room as an array
        res.status(200).send([room]);
    });


    // ADMIN CRUD for rooms

    // Create a new room 
    app.post("/api/rooms", requireAuthAdmin, async (req, res) => {
        const newRoom = new Room(req.body);

        try {
            await newRoom.save();
            res.send(newRoom);
        } catch (e) {
            res.send(e);
        }

    });

    // update a existing room
    app.patch("/api/rooms/:id", requireAuthAdmin, async (req, res) => {

        const updates = Object.keys(req.body);

        try {
            const room = await Room.findById(req.params.id);

            if (!room) {
                return res.status(404).send("That room was not found");
            }

            updates.forEach((update) => {
                room[update] = req.body[update];
            });

            await room.save();
            res.status(200).send(room);
        } catch (e) {
            res.send(e);
        }
    });

    // delete an existing room
    app.delete("/api/rooms/:id", requireAuthAdmin, async (req, res) => {

        // we want to check that the room exists and also that no bookings have already been made for that room
        try {
            const booking = await Booking.findOne({ _room: req.params.id });

            if (!booking) {
                const room = await Room.findByIdAndDelete(req.params.id);

                if (!room) {
                    return res.status(404).send("That room was not found.");
                }
                return res.send(room);
            }

            res.send({ error: "That has bookings associated to it and cannot be removed." });
        } catch (e) {
            res.send(e);
        }
    });

};