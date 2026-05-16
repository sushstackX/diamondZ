const repo = require("./processStep.repository");

// GET ALL
const getAllProcessSteps = async () => {
  return await repo.getAll();
};

// GET BY ID
const getProcessStepById = async (id) => {
  const step = await repo.getById(id);

  if (!step) {
    throw new Error("Process step not found");
  }

  return step;
};

// CREATE
const createProcessStep = async (data) => {
  if (!data.title || !data.description) {
    throw new Error("Title and Description are required");
  }

  return await repo.create({
    title: data.title,
    description: data.description,
    icon: data.icon,
    isActive: data.isActive ?? true,
  });
};

// UPDATE
const updateProcessStep = async (id, data) => {
  return await repo.update(id, data);
};

// DELETE
const deleteProcessStep = async (id) => {
  return await repo.remove(id);
};

module.exports = {
  getAllProcessSteps,
  getProcessStepById,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
};