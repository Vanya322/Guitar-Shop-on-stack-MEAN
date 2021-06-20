const errorHandler = require('../utils/error-handler');
const categoryModel = require('../models/Category');
const positionModel = require('../models/Position');

module.exports.getAll = async (req, res) => {
    try {
        const categoryes = await categoryModel.find({
            user: req.user.id
        });

        res.status(200).json(categoryes);
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await categoryModel
            .findById(req.params.id);

        res.status(200).json(category);

    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await categoryModel.findByIdAndRemove(req.params.id);
        await positionModel.remove({
            category: req.params.id
        })
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
        const category = new categoryModel({
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        })

        category.save();

        res.status(201).json(category)
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {
    let updated = {
        name: req.body.name,
    };

    if(req.file)
        updated.imageSrc = req.file.path

    try {
        const category = await categoryModel.findOneAndUpdate(
        {
                _id: req.params.id
             },
        {
                $set: updated
            },
        {
                new: true
            })
        res.status(200);
    }
    catch(e) {
        errorHandler(res, e);
    }
}
