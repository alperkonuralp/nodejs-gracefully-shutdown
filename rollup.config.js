import {nodeResolve as resolve} from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const config = [
	{
		input: "build/compiled/index.js",
		output: {
			file: "gracefully_shutdown.js",
			format: "cjs",
			sourcemap: true,
		},
		plugins: [resolve(), typescript()],
	},
	{
		input: "build/compiled/index.d.ts",
		output: {
			file: "gracefully_shutdown.d.ts",
			format: "es",
		},
		plugins: [dts()],
	},
];

export default config;
