const express = require("express");

const { LocationControllers } = require("./controller");

const router = express.Router();

module.exports.LocationAPI = (app) => {
  router
  .get("/", LocationControllers.getCities);

  app.use("/api/cities", router);
};
