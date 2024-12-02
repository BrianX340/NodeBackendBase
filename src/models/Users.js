const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    salt: String,
    username:{
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

Users.pre('save', async function (next) {
    try{
        let user = this;
        if (!user.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        let encryptedPass =  await bcrypt.hash(user.password, salt);

        user.email = user.email.toLowerCase();
        user.password = encryptedPass;
        user.username = user.username.toLowerCase();
        next();
    }
    catch(e){
        console.error(e);
        return e;
    }
})

Users.methods.login = async function(candidatePassword) {
    try{
        let user = this;
        let isValid = await bcrypt.compare(candidatePassword, user.password)
        if(!isValid){
            return false;
        }
        const token = jwt.sign({
            id: user._id,
            user,
        },process.env.TOKEN_SECRET, { expiresIn: tokenExpire })
        return { user, token }
    }
    catch(e){
        console.error(e)
        return false
    }
};

module.exports = mongoose.model('Users', Users)