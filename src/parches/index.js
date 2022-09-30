const express = require("express");

const { ParchesControllers } = require("./controller");

const router = express.Router();

module.exports.ParchesAPI = (app) => {
  router
    .get("/", ParchesControllers.getParches)
    // .get("/:city?", ParchesControllers.getParches)
    .get("/:id", ParchesControllers.getParche)
    .post("/", ParchesControllers.createParche)
    .put("/:id", ParchesControllers.updateParche)
    .delete("/:id", ParchesControllers.deleteParche);

  app.use("/api/parches", router); //concatena las rutas
};
