const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {

    //const { q, nombre, apikey, page = 1, limit } = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
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

const putUsers = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, mail, ...rest } = req.body;

    //Validar contra base de datos
    if (password) {

        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    const updatedUser = await User.findById(user.id);

    res.status(500).json(
        updatedUser
    );
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