const parches = require("../mock/parches.json");

const getAll = (page, limit) => {
  const pages = [];
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
  // return parchesCity;
};

module.exports.ParchesServices = {
  getAll,
  getParche,
  getParchesByCity,
};
