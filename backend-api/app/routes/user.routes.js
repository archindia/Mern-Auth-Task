module.exports = app => {
  const users = require("../controllers/user.controller.js");
  // const bcrypt = require("bcryptjs");
  // const jwt = require("jsonwebtoken");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Create a new User
  router.post("/register", users.register);

  // Create a new User
  router.post("/login", users.login);

  // Create a new User
  router.post("/tokenIsValid", users.tokenIsValid);

    // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Retrieve all User
  router.get("/", auth,users.findAll);


  app.use("/api/users", router);
};
