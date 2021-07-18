const errorHandler = require('../utils/error-handler');
const productModel = require('../models/Product');

module.exports.getAll = async (req, res) => {
    try {
        const products = await productModel.find();

        res.status(200).json(products);
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
            message: `Not found img!`
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
            img: req.file.path,
            description: req.body.description,
            categoryList: [
                {
                    "id": "60f410c635aeb823a476db05",
                    "name": "Guitars"
                },
                {
                    "id": "60f410f835aeb823a476db0b",
                    "name": "Gibson"
                }
            ],
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
        updatedParams.img = req.file.path;

    if(req.body.description)
        updatedParams.description = req.body.description;

    if(req.body.categoryList)
        updatedParams.categoryList = req.body.categoryList;

    if(req.body.count)
        updatedParams.count = req.body.count;

    try {
        await productModel.findByIdAndUpdate({
                _id: req.params.id
            },
            {
                ...updatedParams
            });
        res.status(200);
    }
    catch(e) {
        errorHandler(res, e);
    }
}