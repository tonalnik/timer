import { BuildOptions } from "esbuild";
import packageVersion from "../nodejs/getPackageVersion";

const config: BuildOptions = {
	entryPoints: ["root/index.tsx"],
	outdir: "root/dist",
	define: { "process.env": JSON.stringify({ PACKAGE_VERSION: packageVersion }) },
	jsx: "automatic",
	sourcemap: true,
	bundle: true,
	minify: true,
};

export default config;
