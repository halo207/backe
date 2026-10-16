const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, adminOnly, upload.single('image'), (req, res) => res.status(201).json({ url: `/uploads/${req.file.filename}` }));
router.route('/').get(getProducts).post(protect, adminOnly, createProduct);
router.route('/:id').get(getProductById).delete(protect, adminOnly, deleteProduct);

router.use((error, _req, res, _next) => res.status(400).json({ message: error.message }));

module.exports = router;
