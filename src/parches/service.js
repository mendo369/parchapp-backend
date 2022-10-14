const parches = require("../mock/parches.json");
const Parche = require("../models/parche");
const User = require("../models/user");

const multer = require("multer");

const getAll = async (page, limit) => {
  const pages = [];
  const parches = await Parche.find({}).populate("user", {
    avatar: 1,
    userName: 1,
  });
  for (let i = 0; i < parches.length; i += limit) {
    let pedazo = parches.slice(i, i + limit);
    pages.push(pedazo);
  }
  return pages[page - 1];
};

const getParche = (id) => parches.filter((parche) => parche.id == id);

const getParchesByCity = (city, page, limit) => {
  const parchesCity = parches.filter((parche) => parche.city == city);

  const pages = [];

  for (let i = 0; i < parchesCity.length; i += limit) {
    let pedazo = parchesCity.slice(i, i + limit);
    pages.push(pedazo);
  }
  return pages[page - 1];
};

const createParche = async (parche) => {
  const user = await User.findById(parche.userId);

  const parcheN = new Parche({
    user: user._id,
    city: parche.city,
    place: parche.place,
    description: parche.description,
    media: parche.media,
  });

  try {
    const savedParche = await parcheN.save();
    user.parches = user.parches.concat(savedParche._id);
    await user.save();

    return savedParche;
  } catch (error) {
    console.log(error);
  }
};

module.exports.ParchesServices = {
  getAll,
  getParche,
  getParchesByCity,
  createParche,
};
