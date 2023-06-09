const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    
    const existRole = await Role.findOne({ role });

    if (!existRole) {
        throw new Error(`Role ${role} does not exist`);
    }
}

const existEmail = async (mail = '') => {

    const mailExist = await User.findOne({ mail });

    if (mailExist) {
        throw new Error(`Mail has been took it`);
    }
}

const existUserById = async (id) => {

    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`id ${id} does not exist`);
    }
}

module.exports = {
    isValidRole,
    existEmail,
    existUserById
}