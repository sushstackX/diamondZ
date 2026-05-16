const repo = require("./benefit.repository");

const getAllBenefits = async () => {
  return repo.getAll();
};

const getBenefitById = async (id) => {
  const data = await repo.getById(id);
  if (!data) throw new Error("Benefit not found");
  return data;
};

const createBenefit = async (data) => {
  if (!data.title) throw new Error("Title is required");

  return repo.create({
    title: data.title,
    icon: data.icon,
    isActive: data.isActive ?? true
  });
};

const updateBenefit = async (id, data) => {
  return repo.update(id, data);
};

const deleteBenefit = async (id) => {
  return repo.remove(id);
};

module.exports = {
  getAllBenefits,
  getBenefitById,
  createBenefit,
  updateBenefit,
  deleteBenefit
};