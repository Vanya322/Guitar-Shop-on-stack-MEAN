const errorHandler = require('../utils/error-handler');
const categoryModel = require('../models/Category');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        res.status(200).json(categories);
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await categoryModel.findByIdAndRemove(req.params.id);

        res.status(200).json({
            message: 'Category Removed!'
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.create = async (req, res) => {
    try {
        const searchedCategory = await categoryModel.findOne({
            name: req.body.name
        })

        if(searchedCategory) {
            res.status(400).json({
                message: `This category already created!`
            })

            return;
        }

        const category = new categoryModel({
            name: req.body.name,
        })

        category.save();

        res.status(201).json({
            message: `${req.body.name} category created!`
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {
    try {
        await categoryModel.findByIdAndUpdate({
                _id: req.params.id
            },
            {
                name: req.body.name
            });
        res.status(200).json({
            message: "Category Updated!"
        });
    }
    catch(e) {
        errorHandler(res, e);
    }
}
