const positionModel = require('../models/Position');
const errorHandler = require('../utils/error-handler')

module.exports.getByCategoryId = async (req, res) => {
    try {
        const position = await positionModel.find({
            category: req.params.categoryId,
            user: req.user.id,
        });

        res.status(200).json(position)

    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.create = async (req, res) => {
    try {
        const position = await new positionModel.create({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id,
        }).save();

        res.status(201).json({
            message: "Position created!"
        });
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {
    try {
        await positionModel.findByIdAndUpdate(
            {
            _id: req.params.id
            },
            {
                set: req.body
            },
        )

        res.status(200).json({
            message: 'Position updated!'
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await positionModel.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'Position removed!'
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}
