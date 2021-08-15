const errorHandler = require('../utils/error-handler');
const cartModel = require('../models/Cart');
const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

module.exports.getCart = async (req, res) => {
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

        const cartProducts = foundedCart.products.map(item => {

            let product = allProducts.find(product => String(product._id) == String(item.productId));

            console.log("product__", {
                ...product._doc,
                categoryList: allCategories.filter(category => product.categoryList.includes(category._id)),
                countInCart: item.countInCart,
            });
            return {
                ...product._doc,
                categoryList: allCategories.filter(category => product.categoryList.includes(category._id)),
                countInCart: item.countInCart,
            };
        })

        res.status(200).json(cartProducts);
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

        const cart = await cartModel.findOne({
            userId: req.params.userId,
        });

        const foundProduct = cart.products.find(item => item.productId == req.body.productId);

        if(foundProduct) {

            const updatedProducts = cart.products.map(item => {
                    if(item.productId == req.body.productId) {
                        item.countInCart++;
                    }
                    return item;
                })
            
            await cartModel.findOneAndUpdate({
                    userId: req.params.userId,
                },
                {
                    products: [...updatedProducts]
                });

            res.status(200).json({
                    message: "Product updated in cart!"
                })
            return;
        }

        cart.products.push({
                productId: req.body.productId,
                countInCart: req.body.countInCart,
            })
        
        await cartModel.findOneAndUpdate({
                userId: req.params.userId,
            },
            {
                products: [...cart.products]
            })

        res.status(200).json({
            message: "Product added to cart!"
        })

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

        const cart = await cartModel.findById(req.params.id)

        const foundProduct = cart.products.find(item => item.productId == req.params.productId);

        if(foundProduct) {
            
            if(foundProduct.countInCart > 1) {

                const updatedProducts = cart.products.map(item => {
                    if(item.productId == req.params.productId) {
                        item.countInCart--;
                    }
                    return item;
                })
            
                await cartModel.findOneAndUpdate({
                        userId: req.params.userId,
                    },
                    {
                        products: [...updatedProducts]
                    });
    
                res.status(200).json({
                    message: "Product deleted from cart!"
                })
                return;
            }

            const updatedProducts = cart.products.filter(item => item.productId != req.params.productId)
        
            await cartModel.findOneAndUpdate({
                    userId: req.params.userId,
                },
                {
                    products: [...updatedProducts]
                });

            res.status(200).json({
                message: "Product deleted from cart!"
            })
            return;
            
        }

        res.status(404).json({
            message: "This product not found in cart!"
        })
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
        await cartModel.findOneAndUpdate({
            userId: req.params.userId,
        },
        {
            products: []
        });

        res.status(200).json({
            message: "All products deleted from cart!"
        })
    return;
    }
    catch(e) {
        errorHandler(res, e);
    }
}