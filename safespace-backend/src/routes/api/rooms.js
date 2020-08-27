var router = require("express").Router();
var mongoose = require('mongoose');
var Room = mongoose.model('Room');

router.get("/", (req, res) => {
  Room.find({}, (err, rooms) => {
    var roomMap = {};

    rooms.forEach(function (room) {
      roomMap[room._id] = room;
    });

    res.status(200).json({ rooms: roomMap });
  });
});

module.exports = router;
