const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");

const version = require("../package.json").version;
const banner = `/*!
 * ChattyClient v${version}
 * Build at ${new Date().getFullYear()}
 * Released under the MIT License.
 */`;

module.exports = {
  input: "./build/esm/index.js",
  output: [
    {
      file: "./dist/chatty-client.js",
      format: "umd",
      name: "io",
      sourcemap: true,
      banner,
    },
    {
      file: "./dist/chatty-client.min.js",
      format: "umd",
      name: "io",
      sourcemap: true,
      plugins: [terser()],
      banner,
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/env"]],
      plugins: ["@babel/plugin-transform-object-assign"],
    }),
  ],
};
