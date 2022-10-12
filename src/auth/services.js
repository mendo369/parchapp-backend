const bcrypt = require("bcryptjs");

//Encriptamos!!
const encrypt = async (textPlain) => {
  //123456
  const hash = await bcrypt.hash(textPlain, 1); //0404o4ofoto4o
  return hash;
};

// Comparamos!!
const compare = async (passwordPlain, hashPassword) => {
  //nunca desencriptamos, solo comparamos
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports.AuthServices = { encrypt, compare };
