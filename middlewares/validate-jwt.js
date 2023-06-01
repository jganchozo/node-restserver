const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            msg: 'token is required'
        });
    }

    try {

        const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario qie corresponde al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user does not exists'
            });
        }

        //Verificar si el uid tiene status true
        if (!user.status) {

            return res.status(401).json({
                msg: 'Invalid token - user status false'
            });
            
        }

        req.user = user;
        //req.uid = uid;
        
        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}