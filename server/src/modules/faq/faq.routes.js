const router = require("express").Router();
const controller = require("./faq.controller");

router.get("/", controller.getFaqs);
router.get("/:id", controller.getFaq);
router.post("/", controller.addFaq);
router.put("/:id", controller.editFaq);
router.delete("/:id", controller.removeFaq);

module.exports = router;