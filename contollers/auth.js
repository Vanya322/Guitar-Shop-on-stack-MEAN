const bcrypt = require('bcryptjs');

const cartModel = require('../models/Cart');
const userModel = require('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/error-handler')

module.exports.login = async (req, res) => {

    const candidate = await userModel.findOne({
        email: req.body.email,
    });

    if(!candidate) {
        res.status(404).json({
            message: 'This user not found!'
        });
        return;
    }

    const passwordCheck = bcrypt.compareSync(req.body.password, candidate.password);

    if(candidate && passwordCheck) {
        res.status(200).json({
            id: candidate._id,
            name: candidate.name,
            surname: candidate.surname,
            address: candidate.address,
            type: candidate.type,
        });
        return;
    }

    res.status(404).json({
        message: 'This user not found!'
    })

}

module.exports.register = async (req, res) => {

    const candidate = await userModel.findOne({email: req.body.email});

    if(candidate) {
        res.status(409).json({
            message: 'User with this email already exists!'
        });
        return;
    }

    try {

        const user = new userModel({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            type: req.body.type,
        });

        await user.save();

        const cart = new cartModel({
            userId: user._id,
            products: [],
        })

        cart.save();

        res.status(201).json({
            id: user._id,
            name: user.name,
            surname: user.surname,
            address: user.address,
            type: user.type,
        });
    }
    catch(e) {
        errorHandler(res, e);
    }
}