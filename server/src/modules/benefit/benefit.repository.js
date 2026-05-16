const prisma = require("../../config/prisma");

const getAll = async () => {
  return prisma.benefit.findMany({
    orderBy: { id: "desc" }
  });
};

const getById = async (id) => {
  return prisma.benefit.findUnique({
    where: { id: Number(id) }
  });
};

const create = async (data) => {
  return prisma.benefit.create({
    data
  });
};

const update = async (id, data) => {
  return prisma.benefit.update({
    where: { id: Number(id) },
    data
  });
};

const remove = async (id) => {
  return prisma.benefit.delete({
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