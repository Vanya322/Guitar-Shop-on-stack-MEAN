const express = require('express');
const upload = require('../middleweare/upload')
const router = express.Router();
const controller = require('../contollers/category')

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.delete('/:id', controller.remove);

router.post('/',upload.single('image'), controller.create);

router.put('/:id', upload.single('image'), controller.update);

module.exports = router;