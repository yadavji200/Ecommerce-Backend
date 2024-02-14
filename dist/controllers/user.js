"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const user_1 = require("../models/user");
const newUser = async (req, res, next) => {
    try {
        const { name, email, photo, gender, role, _id, dob } = req.body;
        const user = await user_1.User.create({
            name,
            email,
            photo,
            gender,
            role,
            _id,
            dob,
        });
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    }
    catch (error) { }
};
exports.newUser = newUser;
