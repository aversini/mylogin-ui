export default {
	report: {
		previous: "stats/stats.json",
		current: "tmp/stats.json",
	},
	sizes: [
		{
			path: "dist/assets/index-<hash>.js",
			limit: "30 kb",
		},
		{
			path: "dist/assets/index-<hash>.css",
			limit: "9 kb",
		},
		{
			path: "dist/jsonUtilities-<hash>.js",
			limit: "10 kb",
		},
		{
			path: "dist/react-<semver>.js",
			limit: "46 kb",
		},
	],
};
