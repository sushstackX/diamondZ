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
// MIDDLEWARE
// ==========================
app.use(cors());

app.use(express.json());


// ==========================
// UPLOADS FOLDER
// ==========================
const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {

  fs.mkdirSync(uploadsDir, {
    recursive: true
  });

}


// ==========================
// STATIC FILES
// ==========================
app.use(
  "/uploads",
  express.static(uploadsDir)
);


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

    cb(
      null,
      `${Date.now()}-${safeName}`
    );

  }

});


// ==========================
// MULTER
// ==========================
const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  }

});


// ==========================
// SINGLE IMAGE UPLOAD API
// ==========================
app.post(
  "/api/uploads",
  upload.single("file"),
  (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          success: false,
          message: "No file uploaded"

        });

      }

      res.status(200).json({

        success: true,

        url:
          `${req.protocol}://${req.get("host")}` +
          `/uploads/${req.file.filename}`

      });

    } catch (error) {

      res.status(500).json({

        success: false,
        message: error.message

      });

    }

  }
);


// ==========================
// ROUTES
// ==========================
app.use(
  "/api/benefits",
  require("./modules/benefit/benefit.routes")
);

app.use(
  "/api/process-steps",
  require("./modules/processStep/processStep.routes")
);

app.use(
  "/api/faqs",
  require("./modules/faq/faq.routes")
);

app.use(
  "/api/ppf-pages",
  ppfPageRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/admin",
  require("./modules/admin/admin.routes")
);


// ==========================
// SWAGGER
// ==========================
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


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


module.exports = app;