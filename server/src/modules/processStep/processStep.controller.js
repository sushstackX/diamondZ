const service = require("./processStep.service");

// GET ALL
const getProcessSteps = async (req, res) => {
  try {
    const data = await service.getAllProcessSteps();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
const getProcessStep = async (req, res) => {
  try {
    const data = await service.getProcessStepById(req.params.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE
const addProcessStep = async (req, res) => {
  try {
    const data = await service.createProcessStep(req.body);

    res.status(201).json({
      success: true,
      message: "Process step created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const editProcessStep = async (req, res) => {
  try {
    const data = await service.updateProcessStep(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Process step updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const removeProcessStep = async (req, res) => {
  try {
    await service.deleteProcessStep(req.params.id);

    res.status(200).json({
      success: true,
      message: "Process step deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProcessSteps,
  getProcessStep,
  addProcessStep,
  editProcessStep,
  removeProcessStep,
};