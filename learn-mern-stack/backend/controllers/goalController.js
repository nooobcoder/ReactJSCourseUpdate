const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");

/**
 * @desc    Get goals
 * @route   GET /api/goals
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const getGoals = expressAsyncHandler(async (request, response) =>
	response.status(200).json({ message: "Get Goals" })
);

/**
 * @desc    Create goals
 * @route   POST /api/goals/
 * @access  Private
 * @param {params} request
 * @param {*} response
 * @returns
 */
const createGoals = expressAsyncHandler(async (request, response) => {
	if (!request.body.text) {
		response.status(400);
		throw new Error("Please add a text field.");
	}
	response.status(200).json({ message: "Create Goals" });
});

/**
 * @desc    Update goals
 * @route   PUT /api/goals/:id
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const updateGoals = expressAsyncHandler(async (request, response) =>
	response.status(200).json({ message: "Update Goals" })
);

/**
 * @desc    Delete goals
 * @route   DELETE /api/goals/:id
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const deleteGoals = expressAsyncHandler(async (request, response) =>
	response.status(200).json({ message: "Delete Goals" })
);

module.exports = { getGoals, createGoals, updateGoals, deleteGoals };
