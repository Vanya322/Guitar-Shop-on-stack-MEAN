const errorHandler = require('../utils/error-handler');
const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

module.exports.getAll = async (req, res) => {
    try {
        const products = await productModel.find();

        for(let product of products) {
            for(let i in product.categoryList) {
                const categories = await categoryModel.findById(product.categoryList[i]);
                product.categoryList[i] = {
                    id: categories._id,
                    name: categories.name,
                }
            }
        }

        res.status(200).json(products
            .map(product => ({
                id: product._id,
                name: product.name,
                categoryList: product.categoryList,
                price: product.price,
                description: product.description,
                image: product.image,
                count: product.count,
            })
        ));
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await productModel.findByIdAndRemove(req.params.id);

        res.status(200).json({
            message: 'Product Removed!'
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.create = async (req, res) => {
    if(!req.file) {
        res.status(404).json({
            message: `Not found image!`
        });
        return;
    }

    try {
        const searchedProduct = await productModel.findOne({
            name: req.body.name,
        })

        if(searchedProduct) {
            res.status(400).json({
                message: `This product already created!`
            })
            return;
        }

        const product = new productModel({
            name: req.body.name,
            price: req.body.price,
            image: "/" + req.file.path.split("\\").splice(2).join("/"),
            description: req.body.description,
            categoryList: req.body.categoryList.split(",").map(item => item.trim()),
            count: req.body.count
        })

        product.save();

        res.status(201).json({
            message: `${req.body.name} product created!`
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {

    const updatedParams = {}

    if(req.body.name)
        updatedParams.name = req.body.name;

    if(req.body.price)
        updatedParams.price = req.body.price;

    if(req.file)
        updatedParams.image = "/" + req.file.path.split("\\").splice(2).join("/");

    if(req.body.description)
        updatedParams.description = req.body.description;

    if(req.body.categoryList)
        updatedParams.categoryList = req.body.categoryList.split(",").map(item => item.trim());

    if(req.body.count)
        updatedParams.count = req.body.count;

    try {
        await productModel.findByIdAndUpdate({
                _id: req.params.id
            },
            {
                ...updatedParams
            });
        res.status(200).json({
            message: "Product updated!"
        });
    }
    catch(e) {
        errorHandler(res, e);
    }
}