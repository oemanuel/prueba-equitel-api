'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

const createToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payload, "secretPassword");
}

module.exports = createToken;