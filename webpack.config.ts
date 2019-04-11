import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const webpackConfig: webpack.Configuration = {
  context: path.resolve(__dirname, "./app-style-guide"),
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]-[hash].js",
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "es6",
                target: "es5",
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["raw-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React UI Components",
      template: "./index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    modules: [__dirname, "node_modules"],
  },

  mode: "development",
};

export = webpackConfig;
