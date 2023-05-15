const Role = require('../models/role');

const isValidRole = async (role = '') => {
    
    const existRole = await Role.findOne({ role });

    if (!existRole) {
        throw new Error(`Role ${role} does not exist`);
    }
}


module.exports = {
    isValidRole
}