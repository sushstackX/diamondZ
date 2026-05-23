const service = require('./ppfPage.service');

const getAllPages = async (req, res) => {

  try {

    const data = await service.getAllPages();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getPageBySlug = async (req, res) => {

  try {

    const { slug } = req.params;

    const data = await service.getPageBySlug(slug);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const createPage = async (req, res) => {

  try {

    const data = await service.createPage(req.body);

    res.status(201).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const createManyPages = async (req, res) => {

  try {

    const data = await service.createManyPages(req.body);

    res.status(201).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updatePage = async (req, res) => {

  try {

    const { id } = req.params;

    const data = await service.updatePage(id, req.body);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deletePage = async (req, res) => {

  try {

    const { id } = req.params;

    await service.deletePage(id);

    res.status(200).json({
      success: true,
      message: 'PPF Page Deleted Successfully'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getPageById = async (req, res) => {

  try {

    const { id } = req.params;

    const data = await service.getPageById(id);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const uploadGallery = async (req, res) => {

  try {

    const { id } = req.params;
    const page = await service.getPageById(id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'PPF page not found'
      });
    }

    const images = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    });

    const gallery = Array.isArray(page.gallery)
      ? page.gallery.concat(images)
      : images;

    const data = await service.updateGallery(id, gallery);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getAllPages,
  getPageBySlug,
  getPageById,
  createPage,
  createManyPages,
  updatePage,
  deletePage,
  uploadGallery
};