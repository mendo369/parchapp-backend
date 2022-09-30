const { Schema, model } = require("mongoose");

//creamos un esquema de una nota
const parcheSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  location: String,
  description: String,
  likes: Number
});

//vamos a modificar el objeto toJson que nos devuelve mongo
parcheSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = _id),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

//este va a ser el onjeto del que se instansiaran las demás notas
const Parche = model("Parche", parcheSchema);

module.exports = Parche;