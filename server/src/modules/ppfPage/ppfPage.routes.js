const express = require('express');

const multer = require('multer');

const path = require('path');

const fs = require('fs');

const controller = require('./ppfPage.controller');

const router = express.Router();


// ==========================
// CREATE uploads FOLDER
// ==========================
const uploadsPath = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadsPath)) {

  fs.mkdirSync(uploadsPath, { recursive: true });

}


// ==========================
// MULTER STORAGE
// ==========================
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadsPath);

  },

  filename: (req, file, cb) => {

    const safeName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '');

    cb(
      null,
      `${Date.now()}-${safeName}`
    );

  }

});


// ==========================
// MULTER
// ==========================
const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  }

});


// ==========================
// ROUTES
// ==========================
router.get('/', controller.getAllPages);

router.get('/id/:id', controller.getPageById);

router.get('/:slug', controller.getPageBySlug);

router.post('/', controller.createPage);

router.post('/bulk', controller.createManyPages);

router.post(
  '/:id/gallery',
  upload.array('images', 20),
  controller.uploadGallery
);

router.put('/:id', controller.updatePage);

router.patch('/:id', controller.updatePage);

router.delete('/:id', controller.deletePage);


module.exports = router;