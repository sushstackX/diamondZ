const service = require("./faq.service");

// GET ALL
const getFaqs = async (req, res) => {
  try {
    const data = await service.getAllFaqs();

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

// GET BY ID
const getFaq = async (req, res) => {
  try {
    const data = await service.getFaqById(req.params.id);

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
const addFaq = async (req, res) => {
  try {
    const data = await service.createFaq(req.body);

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const editFaq = async (req, res) => {
  try {
    const data = await service.updateFaq(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const removeFaq = async (req, res) => {
  try {
    await service.deleteFaq(req.params.id);

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getFaqs,
  getFaq,
  addFaq,
  editFaq,
  removeFaq
};