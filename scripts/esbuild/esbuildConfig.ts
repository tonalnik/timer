import { BuildOptions } from "esbuild";

const config: BuildOptions = {
	entryPoints: ["root/index.tsx"],
	outdir: "root/dist",
	jsx: "automatic",
	sourcemap: true,
	bundle: true,
	minify: true,
};

export default config;
