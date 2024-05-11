const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const setUser = (user) =>{
    const payload = {
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        phoneNumber:user.phoneNumber
    }
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const getUser = (token) =>{
    if(!token){
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {setUser, getUser};