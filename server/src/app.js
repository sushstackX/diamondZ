const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const ppfPageRoutes = require("./modules/ppfPage/ppfPage.routes");
const contactRoutes = require('./modules/contact/contact.routes');

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/benefits", require("./modules/benefit/benefit.routes"));
app.use("/api/process-steps",require("./modules/processStep/processStep.routes"));
app.use("/api/faqs", require("./modules/faq/faq.routes"));
app.use("/api/ppf-pages", ppfPageRoutes);
app.use('/api/contact', contactRoutes);

// SWAGGER
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/docs", (req, res) => {
  res.redirect("/api-docs");
});

// HEALTH CHECK
app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "DiamondZ API Running ",
  });

});

module.exports = app;