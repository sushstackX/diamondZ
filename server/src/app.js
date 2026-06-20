const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const ppfPageRoutes = require("./modules/ppfPage/ppfPage.routes");
const contactRoutes = require("./modules/contact/contact.routes");

const app = express();


// ==========================
// CORS CONFIG (PRODUCTION SAFE)
// ==========================
const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:5000",
  "https://api.diamondzppf.com",
  "https://diamondzppf.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      return callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// ==========================
// FIX FOR PRE-FLIGHT REQUESTS (SAFE)
// ==========================
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


// ==========================
// BODY PARSER
// ==========================
app.use(express.json());


// ==========================
// UPLOADS FOLDER
// ==========================
const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


// ==========================
// STATIC FILES
// ==========================
app.use("/uploads", express.static(uploadsDir));


// ==========================
// MULTER STORAGE
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});


// ==========================
// SINGLE FILE UPLOAD
// ==========================
app.post("/api/uploads", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    res.status(200).json({
      success: true,
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
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


// ==========================
// DOCS REDIRECT
// ==========================
app.get("/docs", (req, res) => {
  res.redirect("/api-docs");
});


// ==========================
// HEALTH CHECK
// ==========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DiamondZ API Running"
  });
});


// ==========================
// GLOBAL ERROR SAFETY (OPTIONAL BUT GOOD)
// ==========================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

module.exports = app;