const express = require("express");
const uploadFiles = require("../middlewares/multer");

const { ParchesControllers } = require("./controller");

const router = express.Router();

module.exports.ParchesAPI = (app) => {
  router
    .get("/", ParchesControllers.getParches)
    // .get("/:city?", ParchesControllers.getParches)
    // .get("/:id", ParchesControllers.getParche)
    .get("/user/:token", ParchesControllers.getParchesUser)
    .get("/cities", ParchesControllers.getCities)
    .get("/categories", ParchesControllers.getCategories)
    .post("/", ParchesControllers.createParche)
    .post("/media", uploadFiles(), (req, res) => {
      try {
        console.log(req.files);
        const server = `https://${req.headers.host}/uploads/`;
        const filesUploaded = req.files;
        res.status(200).json({
          pathFiles: filesUploaded.map((file) => {
            return server.concat(file.filename);
          }),
        });
      } catch (error) {
        console.log("Error en multer ", error);
      }
    })
    .put("/like", ParchesControllers.updateLikesParche)
    .put("/save", ParchesControllers.updateSavedParches)
    .delete("/:id", ParchesControllers.deleteParche);

  app.use("/api/parches", router); //concatena las rutas
};
