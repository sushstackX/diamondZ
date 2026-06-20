const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL
const getAll = async () => {
  return await prisma.FAQ.findMany({
    orderBy: { id: "desc" }
  });
};

// GET BY ID
const getById = async (id) => {
  return await prisma.FAQ.findUnique({
    where: { id: Number(id) }
  });
};

// CREATE
const create = async (data) => {
  return await prisma.FAQ.create({
    data: {
      question: data.question,
      answer: data.answer,
      isActive: data.isActive ?? true
    }
  });
};

// UPDATE
const update = async (id, data) => {
  return await prisma.FAQ.update({
    where: { id: Number(id) },
    data
  });
};

// DELETE
const remove = async (id) => {
  return await prisma.FAQ.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};