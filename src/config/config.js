require("dotenv").config(); //dotenv nos ayuda a traer todas las variables del .env

module.exports.config = {
  port: process.env.PORT,
};
