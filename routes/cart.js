const express = require('express');
const router = express.Router();
const controller = require('../contollers/cart')


router.get('/:userId/', controller.getCart)

router.put('/add/:userId/:productId/', controller.addToCart)

router.put('/update/:userId/', controller.updateProductInCart)

router.delete('/:userId/:productId/', controller.removeById)

router.delete('/:userId/', controller.removeAll)


module.exports = router;