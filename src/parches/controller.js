const { ParchesServices } = require("./service");
const jwt = require("jsonwebtoken");

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
        let parches = await ParchesServices.getParchesByCity(city, page, limit);
        res.status(200).json(parches);
      }
      let parches = await ParchesServices.getAll(page, limit);
      res.status(200).json(parches);
      console.log(city, page, limit);
    } catch (error) {
      console.log(error);
    }
  },
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
  getCities: async (req, res) => {
    try {
      const cities = await ParchesServices.getAllCities();
      res.status(200).json(cities);
    } catch (error) {
      console.log(error);
    }
  },
  getCategories: async (req, res) => {
    try {
      const cities = await ParchesServices.getAllCategories();
      res.status(200).json(cities);
    } catch (error) {
      console.log(error);
    }
  },
  // uploadMedia: (req, res) => {
  //   uploadFiles();
  //   console.log(req.files);
  //   res.send(req.);
  // },
  createParche: async (req, res) => {
    try {
      const { body } = req;
      const { city, place, description, media } = body;

      const authorization = req.get("authorization");
      console.log(authorization);
      let token = "";

      if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
        console.log("token: ", token);
      }

      const decodeToken = jwt.verify(token, process.env.JWT);

      console.log(decodeToken);

      if (!token || !decodeToken.id) {
        return res.status(401).json({
          error: "token missing or invalid",
        });
      }

      const userId = decodeToken.id;

      const parche = { userId, city, place, description, media };

      let parcheCreated = await ParchesServices.createParche(parche);
      res.status(200).json(parcheCreated);
      console.log(req.files);
    } catch (error) {
      res.status(200).json({ error: "Error at create parche" });
      console.error(error);
    }
  },
  updateParche: async (req, res) => {},
  deleteParche: async (req, res) => {},
};
