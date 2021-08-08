const express = require('express');
const router = express.Router();
const controller = require('../contollers/cart')


router.get('/:userId/', controller.getCart)

router.put('/:userId/:id', controller.addToCart)

router.delete('/:userId/:id', controller.removeById)

router.delete('/:userId/', controller.removeAll)


module.exports = router;