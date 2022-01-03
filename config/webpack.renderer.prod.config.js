const config = require("./webpack.renderer.config");
module.exports = {
  ...config,
  mode: 'production',
  // target: "electron-renderer"
};
