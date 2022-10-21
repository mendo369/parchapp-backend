require("dotenv").config(); //dotenv nos ayuda a traer todas las variables del .env

module.exports.config = {
  port: process.env.PORT,
  jwt: process.env.JWT,
  uri_db: process.env.DB_URI_PRODUCTION,
};
