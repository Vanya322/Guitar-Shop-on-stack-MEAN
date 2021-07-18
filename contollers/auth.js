const bcrypt = require('bcryptjs');

const User = require('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/error-handler')

module.exports.login = async (req, res) => {

    const candidate = await User.findOne({
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
        res.status(200).json(candidate);
        return;
    }

    res.status(404).json({
        message: 'This user not found!'
    })

}

module.exports.register = async (req, res) => {

    console.log("body",req.body)

    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        res.status(409).json({
            message: 'User with this email already exists!'
        });
        return;
    }

    try {

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            type: req.body.type,
        });

        await user.save();
        res.status(201).json(user);
    }
    catch(e) {
        errorHandler(res, e);
    }


}