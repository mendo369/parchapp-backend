const cities = require("../mock/cities.json");

const getAllCities = () => cities;

module.exports.LocationServices = {
  getAllCities,
};
