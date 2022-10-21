const User = require("../models/user");
const { AuthServices } = require("./services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.AuthControllers = {
  login: async (req, res) => {
    try {
      const { body } = req;
      const { userName, password } = body;
      console.log(userName, password);
      const user = await User.findOne({ userName });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        res.status(401).json({
          error: "User or password invalid",
        });
      }

      const userForToken = {
        id: user._id,
        userName: user.userName,
      };

      const token = jwt.sign(userForToken, `${process.env.jwt}`, {
        expiresIn: 60 * 60 * 24 * 30,
      });

      await res.send({
        name: user.name,
        userName: user.userName,
        avatar: user.avatar,
        token,
        id: user.id,
      });
    } catch (error) {
      console.error(error);
    }
  },
  create: async (req, res) => {
    try {
      const { body } = req;
      const { userName, name, email, avatar, password } = body;

      const alreadyExist = await User.findOne({ userName });

      if (alreadyExist) {
        console.log("already exist");
        res
          .status(409)
          .json({ message: "This user already exist in Parchapp" });
      }

      const passwordHash = await AuthServices.encrypt(password);
      const user = new User({
        userName,
        name,
        email,
        avatar,
        passwordHash,
      });

      const savedUser = await user.save();

      res.json(savedUser);
    } catch (error) {
      console.error(error);
    }
  },
};
