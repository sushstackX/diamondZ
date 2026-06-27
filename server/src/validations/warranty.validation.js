const Joi = require("joi");

/**
 * Create Warranty Validation
 */
const createWarrantySchema = Joi.object({

  customerName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  mobileNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Mobile number must be exactly 10 digits"
    }),

  email: Joi.string()
    .trim()
    .email()
    .allow("", null)
    .optional(),

  vehicleBrand: Joi.string()
    .trim()
    .required(),

  vehicleModel: Joi.string()
    .trim()
    .required(),

  vehicleRegistration: Joi.string()
    .trim()
    .required(),

  productType: Joi.string()
    .trim()
    .required(),

  installationDate: Joi.date()
    .required(),

  installerName: Joi.string()
    .trim()
    .required(),

  invoiceNumber: Joi.string()
    .trim()
    .allow("", null),

  installationArea: Joi.string()
    .trim()
    .allow("", null),

  remarks: Joi.string()
    .trim()
    .allow("", null)

}).options({
  abortEarly: false,
  allowUnknown: false
});


/**
 * Update Warranty Validation
 */
const updateWarrantySchema = Joi.object({

  customerName: Joi.string()
    .trim()
    .min(3)
    .max(100),

  mobileNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/),

  email: Joi.string()
    .trim()
    .email()
    .allow("", null),

  vehicleBrand: Joi.string().trim(),

  vehicleModel: Joi.string().trim(),

  vehicleRegistration: Joi.string().trim(),

  productType: Joi.string().trim(),

  installationDate: Joi.date(),

  installerName: Joi.string().trim(),

  invoiceNumber: Joi.string()
    .trim()
    .allow("", null),

  installationArea: Joi.string()
    .trim()
    .allow("", null),

  remarks: Joi.string()
    .trim()
    .allow("", null)

})
.min(1)
.options({
  abortEarly: false,
  allowUnknown: false
});


/**
 * Mobile Search Validation
 */
const mobileSearchSchema = Joi.object({

  mobile: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Mobile number must be exactly 10 digits"
    })

});


module.exports = {
  createWarrantySchema,
  updateWarrantySchema,
  mobileSearchSchema
};  