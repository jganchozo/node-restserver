const { response, request } = require("express")


const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {

        return res.status(500).json({
            msg: 'you must validate the token'
        });
    }

    const { role, name } = req.user;
    
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not administrator - you can not do that`
        });
    }

    next();
}

module.exports = {
    isAdminRole
}