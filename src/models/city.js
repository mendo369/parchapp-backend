const { Schema, model } = require("mongoose");

//creamos un esquema de una nota
const citySchema = new Schema({
  name: String
})

//vamos a modificar el objeto toJson que nos devuelve mongo
citySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

//este va a ser el objeto del que se instansiaran las demás notas
const City = model("City", citySchema);

module.exports = City;
