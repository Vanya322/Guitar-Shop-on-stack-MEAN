const errorHandler = require('../utils/error-handler');
const cartModel = require('../models/Cart');
const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

module.exports.getCart = async (req, res) => {
    console.log(req.params)
    if(!req.params.userId){
        res.status(404).json({
            message: "User not founded!"
        })
        return;
    }

    try {
        const foundedCart = await cartModel.findOne({
            userId: req.params.userId,
        });

        const allProducts = await productModel.find();
        const allCategories = await categoryModel.find();


        const cart = foundedCart.products.map(item => {
            return {
                ...allProducts.find(product => product._id === item.productId)
                    .map(product => {
                        const categoryList = allCategories
                            .filter(category => product.categoryList.includes(category._id))
                            .map(category => ({
                                id: category._id,
                                name: category.name
                            }))

                        return {
                            id: product._id,
                            name: product.name,
                            categoryList,
                            price: product.price,
                            description: product.description,
                            image: product.image,
                            count: product.count,
                        }
                    }),
                countInCart: item.countInCart,
            };
        })


        res.status(200).json(cart);
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.addToCart = async (req, res) => {
    if(!req.params.userId){
        res.status(404).json({
            message: "User not founded!"
        })
        return;
    }

    try {

    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.removeById = async (req, res) => {
    if(!req.params.userId){
        res.status(404).json({
            message: "User not founded!"
        })
        return;
    }

    try {

    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.removeAll = async (req, res) => {
    if(!req.params.userId){
        res.status(404).json({
            message: "User not founded!"
        })
        return;
    }

    try {

    }
    catch(e) {
        errorHandler(res, e);
    }
}