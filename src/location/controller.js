const { LocationServices } = require("./service");

module.exports.LocationControllers = {
  getCities: async (req, res) => {
    try {
      const cities = LocationServices.getAllCities();
      res.status(200).json(cities);
    } catch (error) {
      console.log(error);
    }
  },
};
