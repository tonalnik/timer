import * as esbuild from "esbuild";
import config from "./esbuildConfig";

const isWatch = process.argv.some((val) => val == "--watch");

if (isWatch) {
	const ctx = await esbuild.context(config);
	await ctx.watch();
} else {
	const result = await esbuild.build(config);
	console.log(result);
}
