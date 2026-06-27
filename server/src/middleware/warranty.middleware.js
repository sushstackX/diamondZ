const {
  createWarrantySchema,
  updateWarrantySchema,
  mobileSearchSchema
} = require("../validations/warranty.validation");

/**
 * Create Warranty Validation
 */
const validateCreateWarranty = (req, res, next) => {

  const { error } = createWarrantySchema.validate(
    req.body,
    {
      abortEarly: false,
      stripUnknown: true
    }
  );

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map(err => ({
        field: err.path[0],
        message: err.message.replace(/"/g, "")
      }))
    });
  }

  next();
};

/**
 * Update Warranty Validation
 */
const validateUpdateWarranty = (req, res, next) => {

  const { error } = updateWarrantySchema.validate(
    req.body,
    {
      abortEarly: false,
      stripUnknown: true
    }
  );

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map(err => ({
        field: err.path[0],
        message: err.message.replace(/"/g, "")
      }))
    });
  }

  next();
};

/**
 * Search Warranty By Mobile Number
 */
const validateMobileSearch = (req, res, next) => {

  const { error } = mobileSearchSchema.validate(
    req.params
  );

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/"/g, "")
    });
  }

  next();
};

module.exports = {
  validateCreateWarranty,
  validateUpdateWarranty,
  validateMobileSearch
};