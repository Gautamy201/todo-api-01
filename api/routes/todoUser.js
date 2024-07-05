const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../model/todoUser");

router.get("/user", (req, res) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.post("/user", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.put("/user/:id", (req, res) => {
  const updateOps = {};
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  User.updateOne({ _id: req.params.id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.delete("/user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
