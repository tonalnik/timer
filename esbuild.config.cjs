module.exports = () => {
	console.log("here");
	const config = {
		bundle: true,
		sourcemap: true,
		platform: "node",
		target: "es2022",
		format: "esm",
		outputFileExtension: ".mjs",
		environment: {},
		concurrency: 4,
		watch: {
			pattern: ["./src/**"],
			ignore: ["dist", "node_modules"],
		},
		plugins: [
			// process.env key => default value
			environmentPlugin({
				BUILD_TIMESTAMP: new Date().toISOString(),
				PORT: "8080",
			}),
			// Array of process.env keys
			environmentPlugin(["PWD", "npm_package_version"]),
		],
	};

	return config;
};
