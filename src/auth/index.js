const express = require("express");

const { AuthControllers } = require("./controllers");

const router = express.Router();

module.exports.AuthAPI = (app) => {
  router
    .post("/login", AuthControllers.login)
    .post("/register", AuthControllers.create);

  app.use("/api/auth", router); //concatena las rutas
}; 
