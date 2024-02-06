/* eslint-disable no-undef */
const User = require("../models/User");
const hashPassword = require("../helpers/hashPass");
const { verifyPassword } = require("../helpers/verifyPass");
const { generateToken, tokenBlacklist } = require("../helpers/jwt-token");

// Create new user
async function createUser(req, res) {
    const name = req?.body?.name;
    const email = req?.body?.email;
    const password = await hashPassword(req.body.password);

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email }, {
            name: 1
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// Login user
async function logInUser(req, res) {
    try {
        const mail = req?.body?.email;
        const pass = req?.body?.password;
        const existingUser = await User.findOne({ email: mail }, { _id: 1, name: 1, password: 1 });
        if (!existingUser) {
            return res.status(400).json({ message: "user does not exist!!!" })
        }
        const isPassMatches = await verifyPassword(pass, existingUser.password);
        if (isPassMatches) {
            res.status(201).
                json(
                    {
                        message: `Log in Successful for ${existingUser.name}`,
                        token: generateToken(existingUser.name, existingUser._id)
                    })
        } else {
            res.status(400).json({ message: "email or password is wrong" })
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

function logOutUser(req, res) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token not provided' });
    }

    // log out user
    tokenBlacklist.add(token);
    res.json({ message: 'User successfully logged out', });
}

function userProfile(req, res) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    res.json({ user: req.user })
}

module.exports = { createUser, logInUser, logOutUser, userProfile };
