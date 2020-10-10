var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");

router.get("/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      return (
        res
          .status(404)
          .json({ errors: "User not found" })
      );
    } else {
      return res.status(200).json({ user: user });
    }
  });
});

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    res.status(200).json({ users: users });
  });
});

router.post("/", function (req, res, next) {
  //Validation
  User.schema.requiredPaths().forEach((path) => {
    console.log(path);
    if (!req.body.user[path]) {
      return res
        .status(422)
        .json({ errors: "Some of the required fields are missing" });
    }
  });

  //Saving
  var user = new User();
  user.name = req.body.user.name;
  user.budget = req.body.user.budget;
  user.contact = req.body.user.contact;
  user.story = req.body.user.story;
  user.searching = req.body.user.searching;
  user.photo = req.body.user.photo || null;

  user
    .save()
    .then(function () {
      return res.json({ user: user.toJSON() });
    })
    .catch(next);
});

module.exports = router;
