const repository = require('./ppfPage.repository');

const getAllPages = async () => {
  return repository.getAllPages();
};

const getPageBySlug = async (slug) => {
  return repository.getPageBySlug(slug);
};

const createPage = async (data) => {
  return repository.createPage(data);
};

const createManyPages = async (data) => {
  return repository.createManyPages(data);
};

const updatePage = async (id, data) => {
  return repository.updatePage(id, data);
};

const updateGallery = async (id, gallery) => {
  return repository.updateGallery(id, gallery);
};

const deletePage = async (id) => {
  return repository.deletePage(id);
};

const getPageById = async (id) => {
  return repository.getPageById(id);
};

module.exports = {

  getAllPages,
  getPageBySlug,
  getPageById,
  createPage,
  createManyPages,
  updatePage,
  updateGallery,
  deletePage

};