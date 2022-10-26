// import { v2 as cloudinary } from "cloudinary";
const { v2 } = require("cloudinary");

const cloudinary = v2;

cloudinary.config({
  cloud_name: "dm3gzvbac",
  api_key: "624334299267549",
  api_secret: "AVJ0Imzm-K6QverX7tiTcTS6gTk",
});

export async function uploadFilesCloudinary(pathFile) {
  return await cloudinary.uploader.upload(pathFile, {
    folder: "parchapp",
  });
}
