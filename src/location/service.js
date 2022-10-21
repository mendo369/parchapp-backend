const City = require('../models/city')

const getAllCities = async () => {
  const cities = await City.find({})
  return cities
};
// const getAllCities = () => cities;

module.exports.LocationServices = {
  getAllCities,
};
