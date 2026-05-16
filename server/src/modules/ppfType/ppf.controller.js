const service = require("./ppf.service");

// GET ALL
const getAllPpfTypes = async (req, res) => {
  try {
    const data = await service.getAllPpfTypes();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY SLUG
const getPpfTypeBySlug = async (req, res) => {
  try {
    const data = await service.getPpfTypeBySlug(req.params.slug);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE
const createPpfType = async (req, res) => {
  try {
    const data = await service.createPpfType(req.body);

    res.status(201).json({
      success: true,
      message: "PPF Type created successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllPpfTypes,
  getPpfTypeBySlug,
  createPpfType
};