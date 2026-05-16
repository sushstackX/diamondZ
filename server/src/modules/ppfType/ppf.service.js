const repo = require("./ppf.repository");

// LIST PAGE
const getAllPpfTypes = async () => {
  const data = await repo.getAll();

  return data.map(item => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    heroTitle: item.heroTitle,
    heroDesc: item.heroDesc,
    shortDesc: item.shortDesc,
    icon: item.icon
  }));
};

// DETAIL PAGE
const getPpfTypeBySlug = async (slug) => {
  const data = await repo.getBySlug(slug);

  if (!data) {
    throw new Error("PPF Type not found");
  }

  return formatResponse(data);
};

// FORMAT RESPONSE (FRONTEND READY)
const formatResponse = (data) => {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,

    hero: {
      title: data.heroTitle,
      description: data.heroDesc
    },

    shortDesc: data.shortDesc,
    whyChoose: data.whyChoose,

    features: (data.features || []).map(f => ({
      title: f.title,
      description: f.description
    })),

    warranties: (data.warranties || []).map(w => ({
      years: w.years,
      title: w.title,
      points: w.points
    })),

    gallery: (data.images || []).map(img => ({
      url: img.imageUrl,
      alt: img.altText,
      isPrimary: img.isPrimary
    }))
  };
};

// CREATE
const createPpfType = async (data) => {
  return await repo.create(data);
};

module.exports = {
  getAllPpfTypes,
  getPpfTypeBySlug,
  createPpfType
};