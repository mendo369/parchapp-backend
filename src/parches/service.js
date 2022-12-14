// const parches = require("../mock/parches.json");
const Parche = require("../models/parche");
const User = require("../models/user");
const City = require("../models/city");
const Category = require("../models/category");
const uploadFilesCloudinary = require("../middlewares/cloudinary");

const getAll = async (page, limit) => {
  const pages = [];
  let parches = await Parche.find({}).populate("user", {
    avatar: 1,
    userName: 1,
  });
  let parchesList = parches.reverse();
  for (let i = 0; i < parchesList.length; i += limit) {
    let pedazo = parchesList.slice(i, i + limit);
    pages.push(pedazo);
  }
  return pages[page - 1];
};

const getParche = async (id) => await Parche.findById(id);

const getParchesByCity = async (city, page, limit) => {
  const parchesCity = await Parche.find({ city: city });

  const pages = [];

  for (let i = 0; i < parchesCity.length; i += limit) {
    let pedazo = parchesCity.slice(i, i + limit);
    pages.push(pedazo);
  }
  return pages[page - 1];
};

const getParchesByUser = async (userName) => {
  const parches = await Parche.find({ userName: userName }).populate("user", {
    avatar: 1,
    userName: 1,
  });
  return parches;
};

const getAllCities = async () => {
  const cities = await City.find({});
  return cities;
};
const getAllCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

const createParche = async (parche) => {
  const user = await User.findById(parche.userId);

  const arrayMedia = parche.media;

  const iterar = async () => {
    let array = [];
    for await (const url of arrayMedia) {
      const urlCloud = await uploadFilesCloudinary(url);
      array.push(urlCloud.secure_url);
    }
    return await array;
  };

  const mediaArray = await iterar();

  const parcheN = new Parche({
    user: user._id,
    city: parche.city,
    place: parche.place,
    category: parche.category,
    description: parche.description,
    media: mediaArray,
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

const setLike = async (id, userId) => {
  const parcheLike = await Parche.findById(id);
  const liked = await parcheLike.likes.some((like) => like == userId);
  if (liked) {
    console.log("ya di?? like");
  } else {
    parcheLike.likes = parcheLike.likes.concat(userId);
    await parcheLike.save();
  }
};

const setSaved = async (id, userId) => {
  const user = await User.findById(userId);
  const saved = await user.parchesSaved.some((parche) => parche == id);
  if (saved) {
    console.log("ya se hab??a guardado");
    return;
  } else {
    user.parchesSaved = user.parchesSaved.concat(id);
    await user.save();
  }
};

module.exports.ParchesServices = {
  getAll,
  getParche,
  getParchesByUser,
  getParchesByCity,
  getAllCities,
  getAllCategories,
  createParche,
  setLike,
  setSaved,
};
