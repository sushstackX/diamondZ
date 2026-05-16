const router = require("express").Router();
const controller = require("./processStep.controller");

router.get("/", controller.getProcessSteps);
router.get("/:id", controller.getProcessStep);
router.post("/", controller.addProcessStep);
router.put("/:id", controller.editProcessStep);
router.delete("/:id", controller.removeProcessStep);

module.exports = router;