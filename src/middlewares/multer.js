const multer = require("multer");
const path = require("path");

function uploadFiles() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../static/public/uploads"));
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(null, `${Date.now()}.${ext}`);
    },
  });

  const upload = multer({ storage: storage }).array("file");

  return upload;
}

module.exports = uploadFiles;
