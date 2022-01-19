const express = require('express');
const router = express.Router();

const categoryRouter = require('./category');
const articleRouter = require('./article');

router.use('/category', categoryRouter);
router.use('/article', articleRouter);

module.exports = router;
