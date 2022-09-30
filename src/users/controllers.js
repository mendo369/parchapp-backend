const User = require("../models/user");

module.exports.UsersControllers = {
  getUsers: async (req, res) => {},
  getUser: async (req, res) => {},
  createUser: async (req, res) => {
    try {
      const { body } = req;

      const { userName, name, email, password } = body;

      const user = new User({
        name,
        userName,
        email,
        passwordHash: password,
      });

      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (req, res) => {},
  deleteUser: async (req, res) => {},
};
