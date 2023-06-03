const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

/**
 * @desc    Get goals
 * @route   GET /api/goals
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const getGoals = expressAsyncHandler(async (request, response) => {
	const goals = await Goal.find();

	response.status(200).json({ message: goals });
});

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

	const goal = await Goal.create({ text: request.body.text });
	response.status(200).json(goal);
});

/**
 * @desc    Update goals
 * @route   PUT /api/goals/:id
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const updateGoals = expressAsyncHandler(async (request, response) => {
	const goal = await Goal.findById(request.params.id);
	if (!goal) {
		response.status(400);
		throw new Error("Goal not found");
	}
	const updatedGoal = await Goal.findByIdAndUpdate(
		request.params.id,
		request.body,
		{ new: true }
	);

	response.status(200).json(updatedGoal);
});

/**
 * @desc    Delete goals
 * @route   DELETE /api/goals/:id
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const deleteGoals = expressAsyncHandler(async (request, response) =>{
		const goal = await Goal.findById(request.params.id);
		if (!goal) {
			response.status(400);
			throw new Error("Goal not found");
		}
		await goal.remove()
	response.status(200).json({ id:request.params.id })}
);

module.exports = { getGoals, createGoals, updateGoals, deleteGoals };
