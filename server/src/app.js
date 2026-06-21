const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const cloudinary = require("./config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const ppfPageRoutes = require("./modules/ppfPage/ppfPage.routes");
const contactRoutes = require("./modules/contact/contact.routes");

const app = express();


// ==========================
// CORS
// ==========================
const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:5000",
  "https://diamondzppf.com",
  "https://api.diamondzppf.com"
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS:", origin);
      callback(null, false);
    }
  },
  credentials: true
}));


app.use(express.json());


// ==========================
// LOCAL UPLOAD FOLDER
// ==========================
const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));


// ==========================
// LOCAL STORAGE
// ==========================
const localStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    cb(null, `${Date.now()}-${safeName}`);
  }
});


// ==========================
// CLOUDINARY STORAGE
// ==========================
const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "diamondz",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});


// ==========================
// USE LOCAL OR CLOUDINARY
// ==========================
const upload = multer({
  storage:
    process.env.NODE_ENV === "production"
      ? cloudStorage
      : localStorage,

  limits: {
    fileSize: 5 * 1024 * 1024
  }
});


// ==========================
// UPLOAD API
// ==========================
app.post("/api/uploads", upload.single("file"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  let imageUrl;

  if (process.env.NODE_ENV === "production") {
    imageUrl = req.file.path;
  } else {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  res.json({
    success: true,
    url: imageUrl
  });

});


// ==========================
// ROUTES
// ==========================
app.use("/api/benefits", require("./modules/benefit/benefit.routes"));
app.use("/api/process-steps", require("./modules/processStep/processStep.routes"));
app.use("/api/faqs", require("./modules/faq/faq.routes"));
app.use("/api/ppf-pages", ppfPageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", require("./modules/admin/admin.routes"));


// ==========================
// SWAGGER
// ==========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/docs", (req, res) => {
  res.redirect("/api-docs");
});


// ==========================
// HEALTH
// ==========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DiamondZ API Running"
  });
});


// ==========================
// ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message
  });
});

module.exports = app;