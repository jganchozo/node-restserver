const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {

    const { q, nombre, apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const postUsers = async (req = request, res = response) => {

    const { name, mail, password, role } = req.body;
    const user = new User({ name, password, mail, role });

    //Verify mail
    // const mailExist = await User.findOne({ mail });
    // if (mailExist) {
    //     return res.status(400).json({
    //         msg: 'Mail has been took it'
    //     });
    // }

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save db
    await user.save();

    res.status(201).json({
        user
    });
}

const putUsers = (req = request, res = response) => {

    const { id } = req.params;

    res.status(500).json({
        msg: 'put API - controller',
        id
    });
}

const patchUsers = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const deleteUsers = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
};