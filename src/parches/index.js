const express = require("express");
const uploadFiles = require("../middlewares/multer");

const { ParchesControllers } = require("./controller");

const router = express.Router();

module.exports.ParchesAPI = (app) => {
  router
    .get("/", ParchesControllers.getParches)
    // .get("/:city?", ParchesControllers.getParches)
    .get("/:id", ParchesControllers.getParche)
    .post("/", ParchesControllers.createParche)
    .post("/media", uploadFiles(), (req, res) => {
      console.log(req.files);
      const server = "http://localhost:4369/uploads/";
      const filesUploaded = req.files;
      res.status(200).json({
        pathFiles: filesUploaded.map((file) => {
          return server.concat(file.filename);
        }),
      });
      // res.json({ response: filesUploaded });
    })
    // .post("/media", ParchesControllers.uploadMedia)
    .put("/:id", ParchesControllers.updateParche)
    .delete("/:id", ParchesControllers.deleteParche);

  app.use("/api/parches", router); //concatena las rutas
};
