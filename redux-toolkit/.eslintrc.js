module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"airbnb",
		"prettier",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"react/jsx-filename-extension": [0],
		"import/extensions": "off",
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": ["error"],
	},
};
