import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration, WebpackPluginInstance } from "webpack";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

const webpackConfig = ()=>{
  const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      title: "React UI Components",
      template: "./index.html",
    }) as any,
  ];

  if (process.env.ENABLE_BUNDLE_ANALYZE) {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
        analyzerMode: "static",
        reportFilename: path.resolve(__dirname, "./bundle-report/report.html"),
      })
    );
  }

  return ({
    context: path.resolve(__dirname, "./style-guide"),
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
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.html$/,
          use: ["raw-loader"],
        },
      ],
    },
    plugins,
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      modules: [__dirname, "node_modules"],
    },

    mode: (process.env.NODE_ENV as any) || "development",
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    devServer: {
      port: 9000,
      compress: true,
      open: true,
      historyApiFallback: true,
    },
  }) as Configuration;
}

export = webpackConfig;
