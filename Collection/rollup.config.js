import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/build.js",
    format: "cjs",
    name: "Collection",
    globals: {
      "lodash": "_",
    }
  },
  plugins: [del({ targets: 'dist/*' }), typescript(), resolve(), commonjs()],
};