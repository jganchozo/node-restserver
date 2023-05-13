const { request, response } = require('express');
const userController = {};

const getUsers = (req = request, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const postUsers = (req = request, res = response) => {
    res.status(201).json({
        msg: 'post API - controller'
    });
}

const putUsers = (req = request, res = response) => {
    res.status(500).json({
        msg: 'put API - controller'
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