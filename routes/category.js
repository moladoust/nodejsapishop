const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category');

router.get('/', CategoryController.index);
router.get('/:id', CategoryController.show);
router.post('/store', CategoryController.store);
router.put('/:id/update', CategoryController.update);
router.delete('/:id/destroy', CategoryController.destroy);
router.put('/:id/activate', CategoryController.activate);
router.put('/:id/deactivate', CategoryController.deactivate);

module.exports = router;