const crypto = require('crypto')
const jwt = require("jsonwebtoken");

const Users = require('../models/Users')

module.exports = {
    login: async (req, res) => {
        var { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                status: 'error',
                errors: 'incomplete_fields',
            });
        }
        email = email.toLowerCase()

        /* En esta parte se busca en la base de datos de Mongo db cuando este activada
        const user = await Users.findOne({ email }).populate({ path: 'movements' }) // Se busca al usuario por el email

        if (!user) { // Si user es null es porque no existe el email entonces devolvemos error
            return res.send({ 'status': 'error', 'error': 'Email inexistente.' })
        }

        //Si existe entonces hacemos el login con el password
        let userLoged = await user.login(password)
        if (!userLoged) { // Si no se logea devolvemos error
            throw new Error('Contraseña incorrecta.')
        }
        */

        // Creamos un usuario ficticio al no tener db
        let userLoged = {
            user: {
                email: 'elpepe@gmail.com',
                password: 'Asd123@',
                username: "User01"
            },
            token: 'aoeusnthaosneuhaoenuth'
        }

        return res.status(200).send({ // Devolvemos el user con el token
            'status': 'success',
            'user': userLoged.user,
            'token': userLoged.token
        })
    },

    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Debe completar los campos',
                });
            }
            /* En esta parte se busca en la base de datos de Mongo db cuando este activada
                let user = await Users.create({ email, password, username })
            */

            // Creamos una variable de usuario ficticio
            let user = {
                email,
                password,
                username: "User01"
            }

            return res.status(200).json({ status: 'success', user });
        } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: 'Ocurrio un problema al crear el usuario.',
            });
        }
    },
};
