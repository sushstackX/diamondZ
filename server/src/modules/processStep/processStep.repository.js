const prisma = require("../../config/prisma");

// GET ALL
const getAll = async () => {
  return await prisma.processStep.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

// GET BY ID
const getById = async (id) => {
  return await prisma.processStep.findUnique({
    where: {
      id: Number(id),
    },
  });
};

// CREATE
const create = async (data) => {
  return await prisma.processStep.create({
    data,
  });
};

// UPDATE
const update = async (id, data) => {
  return await prisma.processStep.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

// DELETE
const remove = async (id) => {
  return await prisma.processStep.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};