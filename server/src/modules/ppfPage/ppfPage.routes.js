const express = require('express');

const controller = require('./ppfPage.controller');

const router = express.Router();

router.get('/', controller.getAllPages);
router.get('/id/:id', controller.getPageById);

router.get('/:slug', controller.getPageBySlug);

router.post('/', controller.createPage);

router.post('/bulk', controller.createManyPages);

router.put('/:id', controller.updatePage);

router.delete('/:id', controller.deletePage);

module.exports = router;