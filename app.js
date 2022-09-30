const express = require("express");

const { config } = require("./src/config/config");

const { UsersAPI } = require("./src/users/index");
const { ParchesAPI } = require("./src/parches/index");
const { LocationAPI } = require("./src/location/index");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json()); //le damos la capacidad al servidor de recibir parametros en el request

UsersAPI(app);
ParchesAPI(app);
LocationAPI(app);

app.listen(config.port, () => {
  console.log("Bienvenido señor stark");
});
