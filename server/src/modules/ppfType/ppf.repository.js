const prisma = require("../../config/prisma");

// GET ALL (LIST)
const getAll = async () => {
  return await prisma.ppfType.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      heroTitle: true,
      heroDesc: true,
      shortDesc: true,
      icon: true,
      isActive: true
    },
    orderBy: { id: "desc" }
  });
};

// GET BY SLUG (DETAIL)
const getBySlug = async (slug) => {
  return await prisma.ppfType.findUnique({
    where: { slug },
    include: {
      images: true,
      features: true,
      warranties: true
    }
  });
};

// CREATE FULL PPF TYPE (NESTED)
const create = async (data) => {
  return await prisma.ppfType.create({
    data: {
      name: data.name,
      slug: data.slug,
      heroTitle: data.heroTitle,
      heroDesc: data.heroDesc,
      shortDesc: data.shortDesc,
      whyChoose: data.whyChoose,
      icon: data.icon,

      features: {
        create: data.features || []
      },

      warranties: {
        create: data.warranties || []
      },

      images: {
        create: data.images || []
      }
    },
    include: {
      features: true,
      warranties: true,
      images: true
    }
  });
};

// UPDATE
const update = async (id, data) => {
  return await prisma.ppfType.update({
    where: { id: Number(id) },
    data
  });
};

// DELETE
const remove = async (id) => {
  return await prisma.ppfType.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getAll,
  getBySlug,
  create,
  update,
  remove
};