const router = require("express").Router();
const controller = require("./benefit.controller");

router.get("/", controller.getBenefits);
router.get("/:id", controller.getBenefit);
router.post("/", controller.addBenefit);
router.put("/:id", controller.editBenefit);
router.delete("/:id", controller.removeBenefit);

module.exports = router;