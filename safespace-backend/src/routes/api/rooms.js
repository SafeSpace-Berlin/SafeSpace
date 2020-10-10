var router = require("express").Router();
var mongoose = require("mongoose");
var Room = mongoose.model("Room");

router.get("/", (req, res) => {
  Room.find({}, (err, rooms) => {
    res.status(200).json({ rooms: rooms });
  });
});

//todo: check if the GET rooms/:id works
router.get("/:id", (req, res) => {
  Room.findById(req.payload.id).then((room) => {
    if (!room) {
      return (
        res
          //todo: not found status code
          .status(422)
          .json({ error: "Room not found" })
      );
    } else {
      return res.status(200).json({ room: room });
    }
  });
});

router.post("/", function (req, res, next) {
  var room = new Room();

  //Validation
  let fromDate = Date.parse(req.body.room.availableFrom);
  let toDate = Date.parse(req.body.room.availableTo);

  // check if dates have the correct format
  if (isNaN(fromDate) || isNaN(toDate)) {
    return res
      .status(422)
      .json({ error: "availableFrom or availableTo are not dates" });
  }
  
  // check if available from not in the past
  if (fromDate < Date.now()) {
    return res
      .status(422)
      .json({ error: "availableFrom should not be in the past" });
  }

  // check if available before to
  if (!(fromDate < toDate)) {
    return res
      .status(422)
      .json({ error: "availableFrom should be before availableTo" });
  }

  //check if all required fields provided 
  Room.schema.requiredPaths().forEach((path) => {
    console.log(path);
    if (!req.body.room[path]) {
      return res
        .status(422)
        .json({ error: "Some of the required fields are missing" });
    }
    room[path] = req.body.room[path];
  });

    room
    .save()
    .then(function () {
      return res.json({ room: room.toJSON() });
    })
    .catch(next);
});

module.exports = router;
