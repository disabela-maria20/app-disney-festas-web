const path = require("path");

module.exports = {
  entry: "./assets/scripts/ts/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve(__dirname, 'assets/scripts/ts'), 'node_modules']

  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
