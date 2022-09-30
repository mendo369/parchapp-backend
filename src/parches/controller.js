//const parches = require("../mock/parches.json");
//const cities = require("../mock/cities.json");

const { ParchesServices } = require("./service");

module.exports.ParchesControllers = {
  getParches: async (req, res) => {
    try {
      const city = req.query.city;
      let page = req.query.page;
      let limit = req.query.limit;
      console.log(city, page, limit);

      if (!page) page = 1;
      if (!limit) limit = 7;

      if (city) {
        let parches = ParchesServices.getParchesByCity(city, page, limit);
        res.status(200).json(parches);
      }
      let parches = ParchesServices.getAll(page, limit);
      res.status(200).json(parches);
      console.log(city, page, limit);
    } catch (error) {
      console.log(error);
    }
  },
  // getParches: async (req, res) => {
  //   try {
  //     const {
  //       params: { city },
  //     } = req;

  //     if (city) {
  //       let parches = ParchesServices.getParchesByCity(city);
  //       res.status(200).json(parches);
  //       console.log(city);
  //     }
  //     let parches = ParchesServices.getAll();
  //     res.status(200).json(parches);
  //     console.log(city);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  getParche: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const parche = ParchesServices.getParche(id);
      res.status(200).json(parche);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  },
  // getParchesCity: async (req, res) => {
  //   try {
  //     const {
  //       params: { city },
  //     } = req;
  //     const parchesByCity = ParchesServices.getParchesByCity(city);
  //     res.status(200).json(parchesByCity);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  createParche: async (req, res) => {},
  updateParche: async (req, res) => {},
  deleteParche: async (req, res) => {},
};
