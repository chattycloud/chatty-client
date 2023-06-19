const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const replace = require("@rollup/plugin-replace");

const version = require("../package.json").version;
const banner = `/*!
 * ChattyClient v${version}
 * Build at ${new Date().getFullYear()}
 * Released under the MIT License.
 */`;

// const API_URL = `http://localhost:3300`;
// const SOCKET_URL = `http://localhost:4400`;
const API_URL = `https://${process.env.NODE_ENV}api.chatty-cloud.com`;
const SOCKET_URL = `wss://${process.env.NODE_ENV}socket.chatty-cloud.com`;

module.exports = {
  input: "./build/esm/index.js",
  output: {
    file: "./dist/chatty-client.esm.min.js",
    format: "esm",
    sourcemap: true,
    plugins: [terser()],
    banner,
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.API_URL": JSON.stringify(API_URL),
        "process.env.SOCKET_URL": JSON.stringify(SOCKET_URL),
        "process.env.VERSION": JSON.stringify(version),
      },
    }),
  ],
};
