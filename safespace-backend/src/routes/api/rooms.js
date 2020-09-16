var router = require("express").Router();
var mongoose = require('mongoose');
var Room = mongoose.model('Room');

router.get("/", (req, res) => {
  Room.find({}, (err, rooms) => {
    res.status(200).json({ rooms: rooms });
  });
});

module.exports = router;
