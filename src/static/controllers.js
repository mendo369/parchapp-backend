const fs = require("fs");
const path = require("path");

module.exports.MediaControllers = {
  getAvatars: async (req, res) => {
    const URL = `https://${req.headers.host}/avatars/`;
    let files = fs.readdirSync(path.join(__dirname, "/public/avatars"));
    const avatars = files.map((file) => {
      return URL.concat(file);
    });
    await res.status(200).json(avatars);
  },
};
