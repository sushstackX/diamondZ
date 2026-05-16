const repo = require("./faq.repository");

// GET ALL
const getAllFaqs = async () => {
  return await repo.getAll();
};

// GET BY ID
const getFaqById = async (id) => {
  const faq = await repo.getById(id);
  if (!faq) throw new Error("FAQ not found");
  return faq;
};

// CREATE
const createFaq = async (data) => {
  if (!data.question || !data.answer) {
    throw new Error("Question and Answer are required");
  }

  return await repo.create({
    question: data.question,
    answer: data.answer,
    isActive: data.isActive ?? true
  });
};

// UPDATE
const updateFaq = async (id, data) => {
  return await repo.update(id, data);
};

// DELETE
const deleteFaq = async (id) => {
  return await repo.remove(id);
};

module.exports = {
  getAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq
};