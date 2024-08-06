const path = require("path");

module.exports = {
  mode: "development",
  entry: { main: path.resolve(__dirname, "src", "index") },
  output: {
    path: path.resolve(__dirname, "build"),
  },
};