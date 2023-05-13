const { request, response } = require('express');
const userController = {};

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

const postUsers = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
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