const prisma = require("../../config/prisma");

// GET ALL
const getAll = async () => {
  return await prisma.fAQ.findMany({
    orderBy: { id: "asc" }
  });
};

// GET BY ID
const getById = async (id) => {
  return await prisma.fAQ.findUnique({
    where: { id: Number(id) }
  });
};

// CREATE
const create = async (data) => {
  return await prisma.fAQ.create({
    data
  });
};

// UPDATE
const update = async (id, data) => {
  return await prisma.fAQ.update({
    where: { id: Number(id) },
    data
  });
};

// DELETE
const remove = async (id) => {
  return await prisma.fAQ.delete({
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