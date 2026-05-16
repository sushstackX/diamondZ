const service = require("./benefit.service");

const getBenefits = async (req, res) => {
  try {
    const data = await service.getAllBenefits();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBenefit = async (req, res) => {
  try {
    const data = await service.getBenefitById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const addBenefit = async (req, res) => {
  try {
    const data = await service.createBenefit(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const editBenefit = async (req, res) => {
  try {
    const data = await service.updateBenefit(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const removeBenefit = async (req, res) => {
  try {
    await service.deleteBenefit(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getBenefits,
  getBenefit,
  addBenefit,
  editBenefit,
  removeBenefit
};