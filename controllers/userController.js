'use strict'

const User = require('../models/User');
const createToken = require('../services/jwt');

const register = async (req, res) => {
    const { name } = req.body;

    const findUser = await User.find({ $or: [{ name }] });
    if (findUser.length > 0) {
        res
            .status(500)
            .json({ message: "errors.user.userExists" });
        return;
    }
    const user = {
        name,
    };
    const newUser = new User(user);
    newUser.save().then((userCreated) => {
        res.status(200).json(userCreated);
    });
};

const login = async (req, res) => {
    const { name } = req.body;

    const foundUser = await User.findOne({ name });
    if (foundUser) {
        const token = createToken(foundUser);
        const cookieProps = {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true,
        };
        res
            .status(200)
            .cookie("token", token, cookieProps)
            .json({
                data: {
                    name: foundUser.name,
                    token: token,
                },
                message: "ok",
            });
    } else {
        res.json({ message: "errors.user.userNotExists" });
    }
};

const logout = (req, res) => {
    res.clearCookie("token").json({ message: "ok" });
};

module.exports = {
    register,
    login,
    logout
};