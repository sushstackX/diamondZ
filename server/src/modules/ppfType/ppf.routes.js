const router = require("express").Router();
const controller = require("./ppf.controller");

// READ
router.get("/", controller.getAllPpfTypes);
router.get("/:slug", controller.getPpfTypeBySlug);

// CREATE
router.post("/", controller.createPpfType);

module.exports = router;