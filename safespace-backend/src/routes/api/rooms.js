var router = require("express").Router();

let mockedRooms = [{ roomId: "1" }, { roomId: "2" }, { roomId: "3" }];

router.get("/", (req, res) => {
  res.status(200).json({ rooms: mockedRooms });
});

module.exports = router;
