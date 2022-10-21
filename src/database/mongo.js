const mongoose = require("mongoose");
const { config } = require("../config/config");

const dbConnect = () => {
  const DB_URI =
    "mongodb+srv://dema369:luiscarluis369@parchapp.wfjow.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("**** CONEXION CORRECTA ****");
      } else {
        console.log("***** ERROR DE CONEXION ****");
        console.log("Error: ", err);
      }
    }
  );
};

module.exports = { dbConnect };
