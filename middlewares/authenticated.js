'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

const auth = (req, res, next) => {
    const token = req.headers["access-token"];

    try {
        const payload = jwt.decode(token.replace(/['"]+/g, ''), "secretPassword");
        if (payload.exp <= moment().unix()) {
            res
                .status(401)
                .json({ message: "errors.notAuthenticated" });
        };
        req.user = payload;
        next();
    } catch (err) {
        res
            .status(401)
            .json({ message: "errors.notAuthenticated" });
    }
};

module.exports = {auth};