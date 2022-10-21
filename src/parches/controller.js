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
  getParchesUser: async (req, res) => {
    try {
      const {
        params: { token },
      } = req;

      const decodeToken = jwt.verify(token, process.env.JWT);

      const id = decodeToken.id;

      const parchesUser = await ParchesServices.getParchesByUser(id);
      res.status(200).json({ parches: parchesUser });
    } catch (error) {
      res.status(500).json({ error: "Error inesperado" });
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
  createParche: async (req, res) => {
    try {
      const { body } = req;
      const { city, place, category, description, media } = body;

      const authorization = req.get("authorization");
      console.log(authorization);
      let token = "";

      if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
        console.log("token: ", token);
      }

      const decodeToken = jwt.verify(token, process.env.JWT);

      if (!token || !decodeToken.id) {
        return res.status(401).json({
          error: "token missing or invalid",
        });
      }

      const userId = decodeToken.id;

      const parche = { userId, city, place, category, description, media };

      let parcheCreated = await ParchesServices.createParche(parche);
      res.status(200).json(parcheCreated);
      console.log(req.files);
    } catch (error) {
      res.status(200).json({ error: "Error at create parche" });
      console.error(error);
    }
  },
  updateLikesParche: async (req, res) => {
    try {
      const { body } = req;
      const { id, token } = body;

      const decodeToken = jwt.verify(token, process.env.JWT);

      if (!token || !decodeToken.id) {
        return res.status(401).json({
          error: "token missing or invalid",
        });
      }

      const userId = decodeToken.id;

      ParchesServices.setLike(id, userId);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(200);
    }
  },
  updateSavedParches: async (req, res) => {
    try {
      const { body } = req;
      const { id, token } = body;

      const decodeToken = jwt.verify(token, process.env.JWT);

      if (!token || !decodeToken.id) {
        return res.status(401).json({
          error: "token missing or invalid",
        });
      }

      const userId = decodeToken.id;

      ParchesServices.setSaved(id, userId);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(200);
    }
  },
  deleteParche: async (req, res) => {},
};
