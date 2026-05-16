const prisma = require('../../config/prisma');

const getAllPages = async () => {

  return prisma.ppfPage.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      id: 'asc'
    }
  });

};

const getPageBySlug = async (slug) => {

  return prisma.ppfPage.findUnique({
    where: {
      slug
    }
  });

};

const createPage = async (data) => {

  return prisma.ppfPage.create({
    data
  });

};

const createManyPages = async (data) => {

  return prisma.ppfPage.createMany({
    data
  });

};

const updatePage = async (id, data) => {

  return prisma.ppfPage.update({
    where: {
      id: Number(id)
    },
    data
  });

};

const deletePage = async (id) => {

  return prisma.ppfPage.delete({
    where: {
      id: Number(id)
    }
  });

};

const getPageById = async (id) => {

  return prisma.ppfPage.findUnique({
    where: {
      id: Number(id)
    }
  });

};

module.exports = {
  getAllPages,
  getPageBySlug,
  getPageById,
  createPage,
  createManyPages,
  updatePage,
  deletePage
};