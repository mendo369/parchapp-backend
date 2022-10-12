const { Schema, model } = require("mongoose");

//creamos un esquema de una nota
const parcheSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  city: {
    // type: Schema.Types.ObjectId,
    // ref:"City",
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
  media: [String],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//vamos a modificar el objeto toJson que nos devuelve mongo
parcheSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

//este va a ser el onjeto del que se instansiaran las demás notas
const Parche = model("Parche", parcheSchema);

module.exports = Parche;
