const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    const ext = file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: "diamondz/warranty",

      resource_type: isVideo ? "video" : "image",

      public_id:
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .substring(2, 8),

      format: ext
    };
  }
});

const upload = multer({

  storage,

  limits: {

    files: 10,

    fileSize: 5 * 1024 * 1024
  },

  fileFilter(req, file, cb) {

    const allowed = [

      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "video/mp4"

    ];

    if (!allowed.includes(file.mimetype)) {

      return cb(
        new Error(
          "Only JPG, PNG, WEBP and MP4 files are allowed"
        )
      );
    }

    cb(null, true);
  }

});

module.exports = upload;