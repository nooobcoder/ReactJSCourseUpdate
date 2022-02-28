const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc    Create new user
 * @route   POST /api/users/
 * @access  Public
 * @param {params} request
 * @param {*} response
 * @returns
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error({ message: "User already exists" });
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({ name, email, password: hashedPassword });
	console.log(user);
	if (user) {
		res.status(201).json({ _id: user.id, name: user.name, email: user.email });
	} else {
		res.status(400);
		throw new Error({ message: "Invalid user data" });
	}
});

/**
 * @desc    Authneticate a user
 * @route   POST /api/users/login
 * @access  Public
 * @param {params} request
 * @param {*} response
 * @returns
 */
const loginUser = asyncHandler(async (req, res) => {
	res.json({ message: "Login User" });
});

/**
 * @desc    Authneticate a user
 * @route   GET /api/users/login
 * @access  Public
 * @param {params} request
 * @param {*} response
 * @returns
 */
const getUser = asyncHandler(async (req, res) => {
	res.json({ message: "User data display" });
});

module.exports = { registerUser, loginUser, getUser };
