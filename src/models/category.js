const { Schema, model } = require("mongoose");

//creamos un esquema de una nota
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

//vamos a modificar el objeto toJson que nos devuelve mongo
categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

//este va a ser el objeto del que se instansiaran las demás notas
const Category = model("Category", categorySchema);

module.exports = Category;
