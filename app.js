const express = require("express");
const path = require("path");

const { config } = require("./src/config/config");
const { dbConnect } = require("./src/database/mongo");

const { AuthAPI } = require("./src/auth/index");
const { UsersAPI } = require("./src/users/index");
const { ParchesAPI } = require("./src/parches/index");
const { LocationAPI } = require("./src/location/index");
const { MediaAPI } = require("./src/static/index");
const { IndexApi, NotFoundApi } = require("./src/index/index");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json()); //le damos la capacidad al servidor de recibir parametros en el request
app.use(express.static(path.join(__dirname, "/src/static/public")));

IndexApi(app);
AuthAPI(app);
UsersAPI(app);
ParchesAPI(app);
MediaAPI(app);
LocationAPI(app);
NotFoundApi(app);

app.listen(config.port, () => {
  console.log("Bienvenido señor stark");
});

dbConnect();
