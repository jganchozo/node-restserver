const { request, response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {

    const { mail, password } = req.body;

    try {

        //Verificar si el usuario existe
        const user = await User.findOne({ mail });

        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - mail'
            });
        }

        //Verificar usuario activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - status false'
            });
        }

        //Validar contrasena
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - password'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: 'Contact to administrator'
        });
    }
};


module.exports = {
    login
};