module.exports = {
	extends: [
		"airbnb-typescript",
		"airbnb/hooks",
		"plugin:@typescript-eslint/recommended",
		"plugin:jest/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["react", "@typescript-eslint", "jest", "simple-import-sort"],
	env: {
		browser: true,
		es6: true,
		jest: true,
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	rules: {
		"linebreak-style": "off",
		"simple-import-sort/imports": "warn",
		"simple-import-sort/exports": "warn",
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],
		"@typescript-eslint/camelcase": "off",
	},

	settings: {
		jest: {
			version: 26,
		},
	},
};
