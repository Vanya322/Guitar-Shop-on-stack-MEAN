const express = require('express');
const router = express.Router();
const controller = require('../contollers/position')

router.get('/:categoryId', controller.getByCategoryId)

router.post('/', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.remove)



module.exports = router;