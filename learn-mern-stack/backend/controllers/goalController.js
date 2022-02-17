/**
 * @desc    Get goals
 * @route   GET /api/goals
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const getGoals = (request, response) =>
	response.status(200).json({ message: "Get Goals" });

/**
 * @desc    Get goals
 * @route   POST /api/goals
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const createGoals = (request, response) =>
	response.status(200).json({ message: "Get Goals" });

/**
 * @desc    Set goals
 * @route   POST /api/goals/
 * @access  Private
 * @param {params} request
 * @param {*} response
 * @returns
 */
const setGoal = (request, response) =>
	response.status(200).json({ message: "Get Goals" });

/**
 * @desc    Update goals
 * @route   PUT /api/goals/:id
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const updateGoals = (request, response) =>
	response.status(200).json({ message: "Get Goals" });

/**
 * @desc    Delete goals
 * @route   DELETE /api/goals
 * @access  Private
 * @param {*} request
 * @param {*} response
 * @returns
 */
const deleteGoals = (request, response) =>
	response.status(200).json({ message: "Get Goals" });

module.exports = { getGoals, createGoals, updateGoals, deleteGoals };
