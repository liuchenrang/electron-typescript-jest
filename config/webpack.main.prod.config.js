const path = require('path');
const config = require("./webpack.main.config");
module.exports = {
  ...config,
  mode: 'production',
};