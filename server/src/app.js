const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/benefits", require("./modules/benefit/benefit.routes"));
app.use("/api/process-steps", require("./modules/processStep/processStep.routes"));
app.use("/api/faqs", require("./modules/faq/faq.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/ppf-types", require("./modules/ppfType/ppf.routes"));

// docs redirect
app.get("/docs", (req, res) => {
  res.redirect("/api-docs");
});

app.get("/", (req, res) => {
  res.send("DiamondZ API Running");
});

module.exports = app;