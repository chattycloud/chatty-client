const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");
const replace = require('@rollup/plugin-replace');

const version = require("../package.json").version;
const banner = `/*!
 * ChattyClient v${version}
 * Build at ${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()}
 * Released under the MIT License.
 */`;

// const API_URL = `http://localhost:3300`;
// const SOCKET_URL = `http://localhost:4400`;
const API_URL = `https://${process.env.NODE_ENV}api.chatty-cloud.com`;
const SOCKET_URL = `wss://${process.env.NODE_ENV}socket.chatty-cloud.com`;


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
      browser: true
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/env"]],
      plugins: ["@babel/plugin-transform-object-assign"],
    }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.API_URL': JSON.stringify(API_URL),
        'process.env.SOCKET_URL': JSON.stringify(SOCKET_URL),
        'process.env.VERSION': JSON.stringify(version),
      },
    })
  ],
};
