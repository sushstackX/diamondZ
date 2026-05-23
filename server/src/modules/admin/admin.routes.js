const express = require('express');
const router = express.Router();
const prisma = require('../../config/prisma');


// ======================
// ADMIN RESOURCES
// ======================
router.get('/resources', (req, res) => {
  res.json([
    {
      key: 'ppf-pages',
      label: 'PPF Pages',
      endpoint: 'ppf-pages',

      tableColumns: ['id', 'title', 'slug', 'isActive'],

      fields: [
        { name: 'title', type: 'text' },
        { name: 'slug', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'introTitle', type: 'text' },
        { name: 'introDesc', type: 'textarea' },

        // JSON fields (important)
        { name: 'features', type: 'textarea' },
        { name: 'uniqueCharacteristics', type: 'textarea' },
        { name: 'warranties', type: 'textarea' },
        { name: 'gallery', type: 'textarea' },

        { name: 'isActive', type: 'checkbox' }
      ]
    }
  ]);
});


// ======================
// GET ALL PPF PAGES
// ======================
router.get('/crud/ppf-pages', async (req, res) => {
  const data = await prisma.ppfPage.findMany({
    orderBy: { id: 'desc' }
  });

  res.json({ data });
});


// ======================
// GET BY ID
// ======================
router.get('/crud/ppf-pages/:id', async (req, res) => {
  const data = await prisma.ppfPage.findUnique({
    where: { id: Number(req.params.id) }
  });

  res.json(data);
});


// ======================
// CREATE
// ======================
router.post('/crud/ppf-pages', async (req, res) => {
  const data = await prisma.ppfPage.create({
    data: req.body
  });

  res.json(data);
});


// ======================
// UPDATE
// ======================
router.put('/crud/ppf-pages/:id', async (req, res) => {
  const data = await prisma.ppfPage.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });

  res.json(data);
});


// ======================
// DELETE
// ======================
router.delete('/crud/ppf-pages/:id', async (req, res) => {
  await prisma.ppfPage.delete({
    where: { id: Number(req.params.id) }
  });

  res.json({ success: true });
});


// ======================
// SCHEMA (FORM CONFIG)
// ======================
router.get('/schema/:key', (req, res) => {

  const { key } = req.params;

  if (key === 'ppf-pages') {
    return res.json({
      key: 'ppf-pages',
      label: 'PPF Pages',
      endpoint: 'ppf-pages',

      tableColumns: ['id', 'title', 'slug', 'isActive'],

      fields: [
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'slug', type: 'text', label: 'Slug' },
        { name: 'subtitle', type: 'text', label: 'Subtitle' },
        { name: 'introTitle', type: 'text', label: 'Intro Title' },
        { name: 'introDesc', type: 'textarea', label: 'Intro Description' },

        { name: 'features', type: 'textarea', label: 'Features (JSON)' },
        { name: 'uniqueCharacteristics', type: 'textarea', label: 'Unique Characteristics (JSON)' },
        { name: 'warranties', type: 'textarea', label: 'Warranties (JSON)' },
        { name: 'gallery', type: 'textarea', label: 'Gallery (JSON)' },

        { name: 'isActive', type: 'checkbox', label: 'Active' }
      ]
    });
  }

  return res.status(404).json({
    message: 'Schema not found'
  });

});

module.exports = router;