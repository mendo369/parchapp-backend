const multer = require("multer");

function uploadFiles() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/static/public/uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(null, `${Date.now()}.${ext}`);

      console.log(file.originalname);
      console.log("ext", ext);
    },
  });

  const upload = multer({ storage: storage }).array("file");

  return upload;
}

module.exports = uploadFiles;
