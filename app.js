const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const todoUserRoutes = require("./api/routes/todoUser");

// body-parser config code - - - - -
const bodyParser = require("body-parser");

// mongoose data base config to this api
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://gautamy123:Gautamy123@tornament.msfoakm.mongodb.net/TodoApp-DataBase?retryWrites=true&w=majority&appName=Tornament"
);

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB. Error:", err);
});

mongoose.connection.on("connected", (connected) => {
  console.log("Connected to MongoDB");
});

// use Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to parse JSON request bodies

app.use("/todoApi", todoUserRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Api Address is not correct check it " });
});

module.exports = app;
