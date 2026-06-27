const express = require("express");
const router = express.Router();

const controller = require("./warranty.controller");
const upload = require("../../middleware/upload");

const {
  validateCreateWarranty,
  validateUpdateWarranty,
  validateMobileSearch
} = require("../../middleware/warranty.middleware");

/**
 * Handle Multer Upload
 */
const uploadFiles = (req, res, next) => {
  upload.array("files", 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed."
      });
    }

    next();
  });
};

/**
 * Register Warranty
 */
router.post(
  "/",
  uploadFiles,
  validateCreateWarranty,
  controller.create
);

/**
 * Get All Warranties
 */
router.get(
  "/",
  controller.getAll
);

/**
 * Search Warranty By Mobile Number
 */
router.get(
  "/mobile/:mobile",
  validateMobileSearch,
  controller.getByMobile
);

/**
 * Get Warranty By Id
 */
router.get(
  "/:id",
  controller.getById
);

/**
 * Update Warranty
 */
router.put(
  "/:id",
  validateUpdateWarranty,
  controller.update
);

/**
 * Soft Delete Warranty
 */
router.delete(
  "/:id",
  controller.delete
);

module.exports = router;