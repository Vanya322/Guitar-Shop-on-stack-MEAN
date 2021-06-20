const express = require('express');
const upload = require('../middleweare/upload')
const router = express.Router();
const controller = require('../contollers/category')

router.get('/', controller.getAll);

router.post('/',upload.single('image'), controller.create);

router.put('/:id', upload.single('image'), controller.update);

router.delete('/:id', controller.remove);


module.exports = router;