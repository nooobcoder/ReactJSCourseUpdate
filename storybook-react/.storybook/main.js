module.exports = {
	stories: [
		"../src/**/*.stories.mdx",
		"../src/components/**/*.stories.@(js|jsx|ts|tsx)",
	],
	staticDirs: ["../public"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/preset-create-react-app",
		"@storybook/addon-a11y",
		{
			name: "@storybook/addon-storysource",
			options: {
				loaderOptions: {
					injectStoryParameters: false,
				},
			},
		},
		"storybook-dark-mode",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-webpack5",
	},
	features: {
		interactionsDebugger: true,
	},
};
