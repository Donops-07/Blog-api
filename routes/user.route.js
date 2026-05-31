const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/user.controller.js");

const route = express.Router();

route.post("/sign-up", registerUser);
route.post("/log-in", loginUser);
route.get("/users", getUser)

module.exports = route;
