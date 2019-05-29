const path = require("path");

module.exports = {
  entry: ["./src/index.js", "./src/styles/main.scss"],
  output: {
    filename: "scripts/main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.(png|jp(e*)g|svg|woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
          name: "[name].[ext]"
        }
      }
    ]
  }
};
