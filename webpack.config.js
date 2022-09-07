const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  output: {
    library: "fuirender",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "fuirender.js",
  },
  mode: "production",
  devtool: "hidden-source-map",
  resolve: {
    symlinks: true,
    extensions: [".ts"],
  },
  target: "web",
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
