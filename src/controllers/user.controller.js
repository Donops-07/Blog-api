const UserModel = require("../models/user.model.js");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const envVars = require("../config/env.config.js");

const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });


    try {
        const { email, password, name } = req.body;
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) return res.status(400).json({ message: "User already exist" });

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new UserModel({
            email: email,
            password: hashedPassword,
            name: name
        });

        await user.save();

        return res.status(200).json({ message: "User registered successfully" })
    } catch (error) {
        next(error);
    };
};

const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = loginSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) return res.status(404).json({ error: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const resUser = {
            id: user._id,
            name: user.name,
            email: user.name,
            role: user.role
        };

        const token = jwt.sign(
            { userId: user._id, name: user.name, role: user.role },
            envVars.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({ message: "User logged in", resUser, token });

    } catch (error) {
        next(error);
    };
};

const getUser = async (req, res, next) => {
    try {
        const users = await UserModel.find({});
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser
};